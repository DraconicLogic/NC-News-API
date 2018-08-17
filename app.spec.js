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
   
    beforeEach(function() {
        this.timeout(8000);
       
        // setTimeout(() => {
            return seedDB(testData)
            .then((docs) => {
            
                console.log(docs.length,'HERE ARE THE DOCS...')
                return [commentDocs, articleDocs, topicDocs, userDocs] = docs
                
                
            })
            // .catch(console.log)
            // .catch(console.log)
            // }, 3500)
        })
    
    // })
    after(function() {
        return mongoose.disconnect()
    })
    describe('/topics', () => {
        it('returns all the topics', () => {
            console.log('getting the topics...')
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
        it('returns one article by its id', () => {
            return request.get('api/articles/')
            .expect(200)
            .then((res)=> {
                expect(res.body.article.length).to.equal(1)
            })
        })
    })
   
})