// express 기본 설정
const express = require('express')
const app = express()
const port = 3000

// MongoURI 정보 보호
const config = require('./config/key')

// models
const {User} = require("./models/User")

// express 4.16버전 이후부터는 body-parser를 사용하지 않는다.
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// mongo db 기본 설정
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log('connected')
}).catch((err) =>{
    console.log(err)
})

app.get('/', (req, res) => {
  res.send('Hello World! use nodemon')
})

app.post('/register', (req, res) => {
  // 회원 가입시 필요한 정보들을 client에서 가져와
  // 데이터베이스에 넣어준다.

  // User model 생성
  const user = new User(req.body)
  // save : mongo db의 메서드, model에 request에 담긴 정보를 저장한다.
  user.save((err, doc) => {
    // 연결 실패시 
    if(err) return res.json({success: false, err})
    // 연결 성공시
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})