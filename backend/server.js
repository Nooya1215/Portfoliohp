import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import leoProfanity from 'leo-profanity';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const cache = new Map();

app.use(cors());
app.use(express.json());

// ✅ 욕설 필터 초기화 및 한국어 욕설 추가
leoProfanity.add([
  '씨발', '병신', '개새끼', '닥쳐', '꺼져', '좆', '느금마', '느금',
  '시발', '염병', '썅년', '미친년', '좆같다', '개새', '새끼', '좆밥',
  '빨갱이', '씹', '섹스', '성기', '보지', '자지', '뒤져', '죽어',
  '씹새끼', '좆된', '씹년', '씹창', '씹할', '썅놈', '좆밥', '좆망',
  '똥개', '개놈', '개자식', '좆물', '개지랄', '닥쳐라', '시발련',
  '병신년', '씹탱', '씨벌', '엠창', '뒈져', '씹창놈', '좆됐네', '썅년놈',
  '개좆', '좆나', '좆망', '엿같다', '개같다', '개새끼들', '좆됐다',
  '씹새끼들', '씹놈', '똥', '씹색히', '좆밥새끼', '씨팔',
  'ㅅㅂ', 'ㅆㅂ', 'ㅈㄹ', 'ㅂㅅ', 'ㅄ', 'ㄲㅈ', 'ㄲㅂ', 'ㅅㅄ',
  'ㄸㅅ', 'ㄱㅅ', 'ㅅㅈ', 'ㅁㅊ', 'ㄴㄹ', 'ㅂㅈ', 'ㅈㄱ', 'ㅅㄲ',
  'ㄲㅆ', 'ㅅㅆ', 'ㅅㄹ', 'ㅆㅄ', 'ㅅㅍ', 'ㅂㅍ', 'ㅆㅈ',
]);

let boardCache = null;
let boardCacheTime = 0;
const BOARD_CACHE_TTL = 4 * 24 * 60 * 60 * 1000;

async function preloadBoardCache() {
  try {
    console.log('🚀 서버 시작 시 Board 데이터 캐시 로딩...');
    const { data, error } = await supabase
      .from('board')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    boardCache = data;
    boardCacheTime = Date.now();

    console.log('✅ Board 캐시 preload 완료');
  } catch (err) {
    console.error('❌ Board 캐시 preload 실패:', err);
  }
}

// ✅ 1. API 라우트 - 캐싱 후 응답
app.get('/api/data', async (req, res) => {
  if (cache.has('my-data')) {
    console.log('📦 캐시에서 응답');
    return res.json(cache.get('my-data'));
  }

  console.log('🌐 Supabase에서 조회');
  const { data, error } = await supabase.from('board').select('*');

  if (error) {
    console.error('Supabase fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch data from DB' });
  }

  // 캐싱 후 응답
  cache.set('my-data', data);
  res.json(data);
});

// ✅ 2. Supabase 실시간 구독 - DB 변경 시 캐시 무효화
supabase
  .channel('cache-invalidator')
  .on(
    'postgres_changes',
    {
      event: '*',           // INSERT | UPDATE | DELETE | *
      schema: 'public',
      table: 'board',  // 대상 테이블명
    },
    (payload) => {
      console.log('🔄 DB 변경 감지 → 캐시 삭제');
      cache.delete('my-data');
    }
  )
  .subscribe();

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: '❌ 입력값이 누락되었습니다.' });
  }

  if (leoProfanity.check(name) || leoProfanity.check(message)) {
    return res.status(400).json({ success: false, message: '❌ 욕설로 인한 메시지 전송 실패' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_RECEIVER,
    subject: `💌 Contact from ${name}`,
    text: `보낸 사람: ${name} \n이메일: ${email}\n메시지: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: '✔️ 메일이 전송되었습니다.' });
  } catch (err) {
    console.error('메일 전송 실패:', err);
    res.status(500).json({ success: false, message: '❌ 메일 전송에 실패했습니다.' });
  }
});

app.get('/api/board', async (req, res) => {
  try {
    const now = Date.now();

    if (boardCache && (now - boardCacheTime) < BOARD_CACHE_TTL) {
      console.log('✅ Board 캐시에서 응답');
      return res.status(200).json(boardCache);
    }

    console.log('⏳ Board 캐시 만료, Supabase 조회');
    const { data, error } = await supabase
      .from('board')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    boardCache = data;
    boardCacheTime = now;

    res.status(200).json(data);
  } catch (err) {
    console.error('게시물 조회 실패:', err);
    res.status(500).json({ success: false, message: '게시물 조회 실패' });
  }
});

// ✅ 게시판 새 글 작성 (캐시 무효화 및 시간 초기화)
app.post('/api/board', async (req, res) => {
  try {
    const { name, message } = req.body;

    // ✅ 유효성 검사
    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: '이름과 메시지를 입력해주세요.'
      });
    }

    if (name.length > 5) {
      return res.status(400).json({
        success: false,
        message: '이름은 최대 5자까지 입력 가능합니다.'
      });
    }

    if (message.length > 35) {
      return res.status(400).json({
        success: false,
        message: '내용은 최대 35자까지 입력 가능합니다.'
      });
    }

    if (leoProfanity.check(name) || leoProfanity.check(message)) {
      return res.status(400).json({
        success: false,
        message: '부적절한 언어가 포함되어 있습니다.'
      });
    }

    // ✅ Supabase에 저장
    const { error } = await supabase
      .from('board')
      .insert([{ name, message }]);

    if (error) throw error;

    // ✅ 캐시 무효화
    boardCache = null;
    boardCacheTime = 0;

    return res.status(201).json({
      success: true,
      message: '게시물이 등록되었습니다.'
    });
  } catch (err) {
    console.error('게시물 등록 실패:', err);
    return res.status(500).json({
      success: false,
      message: '게시물 등록 실패'
    });
  }
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await preloadBoardCache();
});
