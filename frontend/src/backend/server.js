import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import mysql from 'mysql2/promise';
import leoProfanity from 'leo-profanity';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MySQL 연결 설정
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// 욕설 필터 초기화 및 한국어 욕설 추가 (필요시)
leoProfanity.add([
  '씨발', '병신', '개새끼', '닥쳐', '꺼져', '좆', '느금마', '느금',
  '시발', '염병', '썅년', '미친년', '좆같다', '개새', '새끼', '좆밥',
  '빨갱이', '씹', '섹스', '성기', '보지', '자지', '뒤져', '죽어',
  '씹새끼', '좆된', '씹년', '씹창', '씹할', '썅놈', '좆밥', '좆망',
  '똥개', '개놈', '개자식', '좆물', '개지랄', '닥쳐라', '시발련',
  '병신년', '씹탱', '씨벌', '엠창', '뒈져', '씹창놈', '좆됐네', '썅년놈',
  '개좆', '좆나', '좆망', '엿같다', '개같다', '개새끼들', '좆됐다',
  '좆됐다', '씹새끼들', '씹놈', '똥', '씹색히', '좆밥새끼', '씨팔',
  'ㅅㅂ', 'ㅆㅂ', 'ㅈㄹ', 'ㅂㅅ', 'ㅄ', 'ㄲㅈ', 'ㄲㅂ', 'ㅅㅄ',
  'ㄸㅅ', 'ㄱㅅ', 'ㅅㅈ', 'ㅁㅊ', 'ㄴㄹ', 'ㅂㅈ', 'ㅈㄱ', 'ㅅㄲ',
  'ㄲㅆ', 'ㅅㅆ', 'ㅅㄹ', 'ㅆㅄ', 'ㅅㅍ', 'ㅂㅍ', 'ㅆㅈ',
]);

// 이메일 전송 API
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: '❌ 입력값이 누락되었습니다.' });
  }

  if (leoProfanity.check(name) || leoProfanity.check(message)) {
    // 욕설 발견 시 메시지 변경
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
    res.status(200).json({ success: true, message: '메일이 전송되었습니다.' });
  } catch (err) {
    console.error('메일 전송 실패:', err);
    res.status(500).json({ success: false, message: '메일 전송에 실패했습니다.' });
  }
});

// 게시글 전체 조회
app.get('/api/board', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM board ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (err) {
    console.error('게시물 조회 실패:', err);
    res.status(500).json({ success: false, message: '게시물 조회 실패' });
  }
});

// 게시글 등록
app.post('/api/board', async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ success: false, message: '이름과 메시지를 입력해주세요.' });
  }

  if (leoProfanity.check(name) || leoProfanity.check(message)) {
    return res.status(400).json({ success: false, message: '부적절한 언어가 포함되어 있습니다.' });
  }

  try {
    await db.query('INSERT INTO board (name, message) VALUES (?, ?)', [name, message]);
    res.status(201).json({ success: true, message: '게시물이 등록되었습니다.' });
  } catch (err) {
    console.error('게시물 등록 실패:', err);
    res.status(500).json({ success: false, message: '게시물 등록 실패' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
