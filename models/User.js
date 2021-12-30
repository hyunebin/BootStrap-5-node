const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
let uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({ // 모델 정의 
    username:{
        type:String,
        required:[true, 'Please provid userName'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Please provid passWord'],
    },
})

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', function(next){
    const user = this

    bcrypt.hash(user.password,10,(error,hash)=>{
        user.password = hash
        next()
    })
})

const User = mongoose.model('User', UserSchema) // mongoose.model('모델 이름', 스키마)
module.exports = User // BlogPost를 추출해서 모듈에 사용

//2016250013 김현빈