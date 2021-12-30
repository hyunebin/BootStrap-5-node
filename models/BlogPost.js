const { stringify } = require('json-buffer')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const BlogPostSchema = new Schema({ // 모델 정의 
    title:String,
    body:String,

    userid:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        require:true
    },
    
    datePosted:{
        type:Date,
        default: new Date()
    },
    image:String
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema) // mongoose.model('모델 이름', 스키마)
module.exports = BlogPost // BlogPost를 추출해서 모듈에 사용

//2016250013 김현빈