const express = require('express');
const path = require('path');
const fs = require('fs');
const mammoth = require('mammoth');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const teachersData = [
  {
    id: 'ku',
    name: '苦老师',
    subject: '语文教师',
    title: '智航教育负责人 · 语文教学',
    motto: '一字一世界，一文一乾坤',
    avatar: '/photo-ku.jpeg',
    tags: ['小升初', '初升高', '高考', '语文'],
    stats: [
      { value: '500+', label: '高考总分' },
      { value: '100+', label: '语数成绩' },
      { value: '3年', label: '辅导经验' }
    ],
    school: '四川农业大学',
    education: '在读本科生',
    subjects: ['小学语文', '初中语文', '高中语文', '小升初衔接', '初升高衔接', '高考冲刺'],
    achievements: [
      { icon: '🏆', title: '全国大学生汉语大赛', desc: '2023年获得三等奖' },
      { icon: '⭐', title: '先进个人', desc: '在校期间获得多项荣誉' },
      { icon: '🎖️', title: '优秀共青团员', desc: '在校期间表现优异' }
    ],
    intro: '苦老师，智航教育负责人，语文教师。主要负责语文教学和统筹安排工作，2023年以来担任小班辅导语文教师、一对一专项辅导老师，对接小升初、初升高、高考等升学定制教育。',
    intro2: '高考成绩500+，其中语文、数学成绩100+。2023年获得全国大学生汉语大赛三等奖，在校期间获得先进个人、优秀共青团等多项荣誉。',
    features: [
      { icon: '📖', title: '语文教学', desc: '系统讲解语文知识，提升阅读写作能力' },
      { icon: '📋', title: '升学规划', desc: '小升初、初升高、高考全方位定制' },
      { icon: '🎯', title: '精准辅导', desc: '一对一专项辅导，因材施教' }
    ],
    resumeFile: '苦老师-语文教师-简历.docx'
  },
  {
    id: 'ku-tutor',
    name: '苦老师',
    subject: '辅导教师',
    title: '智航教育专职教师 · 理科辅导',
    motto: '自知自省，自立自强',
    avatar: '/photo-ku-tutor.jpeg',
    tags: ['物理', '化学', '电子', '理科'],
    stats: [
      { value: '硕士', label: '研究生学历' },
      { value: 'SCI', label: '二区top期刊' },
      { value: '多年', label: '家教经验' }
    ],
    school: '四川农业大学',
    education: '本硕连读电子类专业 | 硕士研究生',
    subjects: ['高中物理', '高中化学', '初中物理', '初中化学', '初升高衔接'],
    achievements: [
      { icon: '📄', title: '二区top期刊论文', desc: '发表SCI二区top期刊论文1篇' },
      { icon: '🎖️', title: '优秀学生干部', desc: '校级先进个人、优秀学生干部' },
      { icon: '🔬', title: '电子类专业', desc: '本硕连读，物理化学知识扎实' }
    ],
    intro: '苦老师，智航教育专职辅导教师，本硕连读电子类专业，物理、化学知识扎实，发表二区top期刊论文1篇，拥有多年家教经验。',
    intro2: '擅长梳理考点重难点，教学耐心细致。善于贴合学生学习习惯授课，针对性查漏补缺，提升学科成绩。在校期间获得校级先进个人、校级优秀学生干部等多项荣誉。',
    features: [
      { icon: '🔬', title: '理科专攻', desc: '本硕电子类，精通物理化学' },
      { icon: '🎯', title: '考点梳理', desc: '擅长梳理重难点，查漏补缺' },
      { icon: '📝', title: '因材施教', desc: '贴合学习习惯，针对性提升' }
    ],
    resumeFile: '苦老师-辅导教师-简历 .docx'
  },
  {
    id: 'wang',
    name: '王老师',
    subject: '理科教师',
    title: '数理化提分专家',
    motto: '学好数理化，走遍天下都不怕',
    avatar: '/photo-wang.png',
    tags: ['数学', '物理', '化学'],
    stats: [
      { value: '600', label: '高考总分' },
      { value: '125+', label: '高考数学' },
      { value: '230+', label: '高考理综' }
    ],
    school: '四川农业大学',
    education: '计算机科学与技术专业 | 在读本科生',
    subjects: ['高中数学', '初中数学', '高中物理', '初中物理', '高中化学', '初中化学', '初升高衔接', '高考冲刺'],
    achievements: [
      { icon: '📚', title: '知识梳理', desc: '系统梳理知识点，构建完整知识体系' },
      { icon: '🎯', title: '基础巩固', desc: '夯实基础，打牢学科根基' },
      { icon: '🚀', title: '难点突破', desc: '针对性突破重难点，快速提升成绩' }
    ],
    intro: '王老师，计算机科学与技术专业在读生，精通数理化。高考总分600分，数学125+，理综230+分，学科功底扎实。',
    intro2: '拥有多年教学经验，授课耐心负责，擅长帮学生梳理知识、巩固基础、突破难点。2024年以来专注高中数学小班、初升高衔接班、高考升学班以及一对一辅导，因材施教贴合学情，口碑良好，学生提分效果显著。',
    features: [
      { icon: '📚', title: '知识梳理', desc: '系统梳理知识点，构建完整知识体系' },
      { icon: '🎯', title: '基础巩固', desc: '夯实基础，打牢学科根基' },
      { icon: '🚀', title: '难点突破', desc: '针对性突破重难点，快速提升成绩' }
    ],
    resumeFile: '王老师-理科教师-简历.docx'
  },
  {
    id: 'chen',
    name: '陈老师',
    subject: '英语教师',
    title: '中高考英语专攻',
    motto: 'Spread knowledge, warm every soul',
    avatar: '/photo-chen.jpeg',
    tags: ['语法', '阅读', '写作'],
    stats: [
      { value: '500+', label: '高考总分' },
      { value: '120+', label: '高考英语' },
      { value: '四六级', label: '已过' }
    ],
    school: '四川农业大学',
    education: '在读本科生',
    subjects: ['小学英语', '初中英语', '高中英语', '语法专项', '词汇拓展', '阅读理解', '写作训练', '听力训练'],
    achievements: [
      { icon: '🏆', title: '高中英语诗词大赛', desc: '荣获一等奖' },
      { icon: '📜', title: '英语四六级证书', desc: '已通过大学英语四六级考试' }
    ],
    intro: '陈老师，英语教师，主要负责英语教学工作。英语四六级已过，拥有英语辅导经验，精通中小学英语全套知识点。',
    intro2: '熟练掌握语法、词汇、阅读、写作、听力专项教学。高考英语成绩120+，高考总成绩500+，高中英语诗词大赛荣获一等奖。热爱教育行业，责任心强，耐心细致，亲和力十足。',
    features: [
      { icon: '📖', title: '语法精通', desc: '系统讲解语法知识，构建完整语法体系' },
      { icon: '📝', title: '词汇拓展', desc: '科学记忆方法，快速扩充词汇量' },
      { icon: '🎯', title: '专项突破', desc: '阅读、写作、听力专项训练' }
    ],
    resumeFile: '陈老师-英语教师-简历.docx'
  },
  {
    id: 'kong',
    name: '孔老师',
    subject: '理科教师',
    title: '数理化提分能手',
    motto: '脚踏实地，仰望星空',
    avatar: '/photo-kong.jpeg',
    tags: ['数学', '物理', '化学', '生物'],
    stats: [
      { value: '240+', label: '高考理综' },
      { value: '中南', label: '双一流大学' },
      { value: '985', label: '院校水平' }
    ],
    school: '中南大学',
    education: '在校本科生',
    subjects: ['高中数学', '高中物理', '高中化学', '高中生物', '初中数学', '初中物理', '初中化学', '高考冲刺'],
    achievements: [
      { icon: '🎯', title: '查漏补缺', desc: '精准定位知识薄弱点，针对性提升' },
      { icon: '💡', title: '新颖教学', desc: '授课方式新颖通俗易懂，激发兴趣' },
      { icon: '📈', title: '高效提分', desc: '因材施教精准提分，帮助学生高效学习' }
    ],
    intro: '孔老师，智航教育专职教师，中南大学在校生，精通初高中数理化。高考理综成绩240+，学识扎实功底深厚，拥有丰富的教学辅导经验。',
    intro2: '深谙学生学习痛点，擅长查漏补缺，授课方式新颖、通俗易懂。授课耐心细致，善于因材施教精准提分，用心陪伴孩子高效学习，助力学业稳步提升。',
    features: [
      { icon: '🔍', title: '痛点诊断', desc: '准确了解学生学习痛点，对症下药' },
      { icon: '📊', title: '分层教学', desc: '根据学生水平分层授课，循序渐进' },
      { icon: '🎯', title: '精准提分', desc: '因材施教，精准提分效果显著' }
    ],
    resumeFile: '孔老师-理科教师-简历.docx'
  },
  {
    id: 'huang',
    name: '黄老师',
    subject: '数学教师',
    title: '中小学数学专攻',
    motto: '学习与生命同行',
    avatar: '/photo-huang.jpeg',
    tags: ['小学数学', '初中数学', '英语'],
    stats: [
      { value: '两年', label: '辅导教学' },
      { value: '100+', label: '高考语数外' },
      { value: '140+', label: '中考英语' }
    ],
    school: '四川农业大学',
    education: '在校本科生',
    subjects: ['小学数学', '初中数学', '小学英语', '初中英语', '小升初衔接'],
    achievements: [
      { icon: '🏆', title: '数学竞赛', desc: '学生阶段多次获得数学竞赛名次' },
      { icon: '📈', title: '百人教学', desc: '累计教学人数超过百人，口碑颇佳' },
      { icon: '👨‍🎓', title: '因材施教', desc: '针对不同情况运用不同方法，成绩进步明显' }
    ],
    intro: '黄老师，智航教育专职教师，拥有两年辅导教学经历，专攻小学数学辅导教学。高考语数外均100+，中考英语140+，学生阶段曾多次获得数学竞赛名次，学科功底扎实。',
    intro2: '拥有多年教学经验，授课耐心负责，擅长因材施教，针对不同情况运用不同方法。2024年以来专注中小学各阶段数学、英语教学，累计教学人数超过百人，学生成绩进步明显，口碑颇佳。',
    features: [
      { icon: '🎯', title: '因材施教', desc: '针对不同学生用不同教学方法' },
      { icon: '📚', title: '多段教学', desc: '覆盖小学到初中多个学段' },
      { icon: '💪', title: '经验丰富', desc: '累计教学人数达百人' }
    ],
    resumeFile: '黄老师-数学教师-简历(1).docx'
  }
];

app.get('/api/teachers', (req, res) => {
  const list = teachersData.map(({ id, name, subject, title, motto, avatar, tags, stats, resumeFile }) => ({
    id, name, subject, title, motto, avatar, tags, stats, resumeFile
  }));
  res.json({ code: 0, data: list });
});

app.get('/api/teachers/:id', (req, res) => {
  const teacher = teachersData.find(t => t.id === req.params.id);
  if (!teacher) {
    return res.status(404).json({ code: 404, message: '教师不存在' });
  }
  res.json({ code: 0, data: teacher });
});

app.get('/api/resume/:id', async (req, res) => {
  const teacher = teachersData.find(t => t.id === req.params.id);
  if (!teacher || !teacher.resumeFile) {
    return res.status(404).json({ code: 404, message: '简历不存在' });
  }
  const fp = path.join(__dirname, teacher.resumeFile);
  if (!fs.existsSync(fp)) {
    return res.status(404).json({ code: 404, message: '简历文件未找到' });
  }
  try {
    const result = await mammoth.extractRawText({ path: fp });
    res.json({ code: 0, data: { file: teacher.resumeFile, text: result.value } });
  } catch (err) {
    res.json({ code: 0, data: { file: teacher.resumeFile, text: '' } });
  }
});

app.get('/api/resume/:id/download', (req, res) => {
  const teacher = teachersData.find(t => t.id === req.params.id);
  if (!teacher || !teacher.resumeFile) {
    return res.status(404).json({ code: 404, message: '简历不存在' });
  }
  const fp = path.join(__dirname, teacher.resumeFile);
  if (!fs.existsSync(fp)) {
    return res.status(404).json({ code: 404, message: '简历文件未找到' });
  }
  res.download(fp, teacher.resumeFile);
});

app.listen(PORT, () => {
  console.log(`🚀 智航教育服务已启动: http://localhost:${PORT}`);
});
