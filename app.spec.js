process.env.NODE_ENV = 'test'
const app = require('./app.js')
const request = require('supertest')(app)
const seedDB = require('./seed/seed.js')
const { expect } = require('chai')
const mongoose = require('mongoose')
const testData = require('./seed/testData/testData.js')

describe('NC News API /api', () => {
   let commentDocs; 
   let articleDocs; 
   let topicDocs;
   let userDocs;
   let wrongID = mongoose.Types.ObjectId()
   
//Needed to increase the timeout to give my computer time to complete tasks
    beforeEach(function() {
        this.timeout(20000);
            return seedDB(testData)
            .then((docs) => {
                return [commentDocs, articleDocs, topicDocs, userDocs] = docs   
            })
        })
    after(function() {
        return mongoose.disconnect()
    })

    describe('Topic Router', () => {
        describe('/topics', () => {
                it('returns all the topics', () => {
                    return request.get(`/api/topics`)
                    .expect(200)
                    .then((res) => {
                        expect(res.body.topics.length).to.equal(2)
                        expect(res.body.topics[0]).to.have.all.keys(
                            '_id',
                            'title',
                            'slug',
                            '__v'
                        )
                })
            })    
        })
        describe('/topics/:topic_slug/articles', () => {
            it.only('returns articles belong to the cat topic', () => {
                return request.get(`/api/topics/cats/articles`)
                .expect(200)
                .then((res) => {
                    expect(res.body.articles.length).to.equal(2)
                    expect(res.body.articles[0].belongs_to).to.equal('cats')
                })
            })
        })
    })
    
    describe('Article Router',() => {
        describe('/articles', () => {
            it('returns all articles', () => {
            return request.get('/api/articles')
            .expect(200)
            .then((res) => {
                expect(res.body.articles.length).to.equal(4)
                expect(res.body.articles[0]).to.have.all.keys(
                    '_id',
                    'title',
                    'belongs_to',
                    'created_by',
                    'body',
                    'created_at',
                    'votes',
                    '__v'
                    )
            })
            })
        
        })
    describe('/articles/:article_id', () => {
       it('returns one article by its id', () => {
            return request.get(`/api/articles/${articleDocs[0]._id}`)
            .expect(200)
            .then((res)=> {
                const title = "Living in the shadow of a great man"
                expect(res.body.article).to.be.an('object')
                expect(res.body.article.title).to.equal(title)
                expect(res.body.article).to.have.all.keys(
                    '_id',
                    'title',
                    'belongs_to',
                    'created_by',
                    'body',
                    'created_at',
                    'votes',
                    '__v'
                )
            })
        })
        it('returns error 400 if article_id is incorect', () => {
            return request.get(`/api/articles/invalidID`)
            .expect(400)
            .then((res)=>{

                expect(res.body.msg).to.equal('Bad Request')
            }
            
            )
        })
    })
    })
    
   
})