process.env.NODE_ENV = 'test'
const app = require('./app.js')
const request = require('supertest')(app)
const seedDB = require('./seed/seed.js')
const { expect } = require('chai')
const mongoose = require('mongoose')
const testData = require('./seed/testData/testData.js')
const Topic = require('./models/Topic.js')

describe('NC News API /api', () => {
   let commentDocs; 
   let articleDocs; 
   let topicDocs;
   let userDocs;
   let wrongID = mongoose.Types.ObjectId()
   

    beforeEach(function() {
    /*Without this.timeout, set to 20000, my tests don't resolve in-time.
    GET a cuppa while you wait.*/
        this.timeout(20000);
            return seedDB(testData)
            .then((docs) => {
                return [commentDocs, articleDocs, topicDocs, userDocs] = docs   
            })
        })
    after(function() {
        return mongoose.disconnect()
    })
    it('ERROR: Returns 404 if no endpoints are hit', ()=>{
        return request.get(`/api/path-to-nowhere`)
        .expect(404)
        .then((res)=>{
            expect(res.body.msg).to.equal('Page not found')
        })
    
    })
    describe('Topics Router', () => {
        describe('/topics', () => {
            it('GET: returns all the topics', () => {
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
            it('GET: returns articles belonging to the cat topic', () => {
                return request.get(`/api/topics/cats/articles`)
                .expect(200)
                .then((res) => {
                    expect(res.body.articles.length).to.equal(2)
                    expect(res.body.articles[0].belongs_to).to.equal('cats')
                    expect(res.body.articles[0]).to.have.property('_id')
                })
            })
            it('GET ERROR: 404 if topic_slug is incorrect', () => {
                return request.get(`/api/topics/not-real-topic/articles`)
                .expect(404)
                .then((res) => {
                    expect(res.body.msg).to.equal('There are no articles belonging to this topic')
                })
            })
            it('POST: add article to existing topic',()=>{
                const newArt = 
                {
                    title: 'Mitch...Our Next PM ?!?',
                    body: 'Honestly anyone is better than the current PM',
                    votes: 52,
                    belongs_to: 'mitch',
                    created_by: userDocs[0]._id
                }
                return request.post(`/api/topics/mitch/articles`)
                .send(newArt)
                .expect(201)
                .then((res) => {
                    const title = 'Mitch...Our Next PM ?!?'
                    expect(res.body.title).to.equal(title)
                    expect(res.body).to.have.all.keys(
                        '_id',
                        'votes',
                        'title',
                        'created_by',
                        'body',
                        'created_at',
                        'belongs_to',
                        '__v'
                    
                    )
                })
            })
            it('POST ERROR: return 400 if a required field is missing',()=>{
                const newArt = 
                {                
                    body: 'The title has been left out so expect this POST request to fail',
                    votes: 52,
                    belongs_to: 'mitch',
                    created_by: userDocs[0]._id
                }
                return request.post(`/api/topics/mitch/articles`)
                .send(newArt)
                .expect(400)
                .then((res) => {
                    
                    expect(res.body.msg).to.equal('Bad Request')
                })
            })
            it.only('POST ERROR: return 404 if a topic slug is missing from database',()=>{
                const newArt = 
                {        
                    title: 'How to throw a 404',      
                    body: 'The title has been left out so expect this POST request to fail',
                    votes: 52,
                    belongs_to: 'mitch',
                    created_by: userDocs[0]._id
                }
                return request.post(`/api/topics/not-found/articles`)
                .send(newArt)
                .expect(404)
                .then((res) => {
                    expect(res.body.msg).to.equal('No such topic exists')
                })
            })
        })
    })
    
    describe('Article Router',() => {
        describe('/articles', () => {
            it('GET: returns all articles', () => {
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
            it('GET: returns one article by its id', () => {
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
            it('GET ERROR: return 404 no article matches valid ID', () => {
                return request.get(`/api/articles/${wrongID}`)
                .expect(404)
                .then((res)=>{
                    expect(res.body.msg).to.equal('ID not found')
                })
            })
            it('PUT: incrememts the vote count of an article',()=>{
                return request.put(`/api/articles/${articleDocs[0]._id}?vote=up`)
                .expect(200)
                .then((res) => {
                    expect(res.body.article.votes).to.equal(1)
                })
            })
            it('PUT: decrements the vote count of an article', ()=>{
                return request.put(`/api/articles/${articleDocs[1]._id}?vote=down`)
                .expect(200)
                .then((res)=> {
                    expect(res.body.article.votes).to.equal(-1)
                })
            })
            it('PUT ERROR: returns 400 if query is not "up" or "down" in lower case', () => {
                return request.put(`/api/articles/${articleDocs[0]._id}?vote=forTrump`)
                .expect(400)
                .then((res) => {
                    expect(res.body.msg).to.equal('query must be either "up" or "down". All lower case')
                })
            })

        })
        describe('/api/articles/:article_id/comments', () => {
            it('GET: return all comments for individual article', () => {
                return request.get(`/api/articles/${articleDocs[0]._id}/comments`)
                .expect(200)
                .then((res) => {
                    expect(res.body.comments.length).to.equal(2)
                    expect(res.body.comments[0].votes).to.equal(7)
                })
            })
            it.only('GET ERROR return 404 if there are no comments for the submitted article', ()=>{
                return request.get(`/api/articles/${wrongID}/comments`)
                .expect(404)
                .then((res)=>{
                    expect(res.body.msg).to.equal('There are no comments for this article')
                })
            })
            it('POST: add a new comment to a article', () => {
                const testComment = 
                {
                    body: 'TL:DR',
                    belongs_to: articleDocs[1]._id,
                    created_by: userDocs[1]._id
                }

                return request.post(`/api/articles/${articleDocs[1]._id}/comments`)
                .send(testComment)
                .expect(201)
                .then((res) => {
                    expect(res.body.comment.body).to.equal('TL:DR')
                    expect(res.body.comment).to.have.property('_id')
                    expect(res.body.comment.created_by).to.be.a('object')
                })

            })
        })
    })
    describe('Comment Router', () => {
        describe('api/comments/:comment_id', () => {
            it('PUT: increments the comment vote', () => {
                return request.put(`/api/comments/${commentDocs[0]._id}?vote=up`)
                .expect(200)
                .then((res) => {
                    expect(res.body.comment.votes).to.equal(8)
                })
            })
            it('PUT: decrements the comment vote', () => {
                return request.put(`/api/comments/${commentDocs[0]._id}?vote=down`)
                .expect(200)
                .then((res) => {
                    expect(res.body.comment.votes).to.equal(6)
                })
            })
            it('DELETE: removes comment from database', () => {

                const commentBody = "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — on you it works."

                return request.delete(`/api/comments/${commentDocs[0]._id}`)
                .expect(200)
                .then((res) => {
                    expect(res.body.comment.body).to.equal(commentBody)
                })
            })
        })
    })
    describe('User Router', () => {
        describe('api/users/:username', () => {
            it('GET: returns profile data for entered username', () => {
                return request.get(`/api/users/dedekind561`)
                .expect(200)
                .then((res)=>{
                    expect(res.body.user.name).to.equal('mitch')
                })
            })
            it('GET ERROR: returns 400 for incorrect username',()=>{
                return request.get(`/api/users/jamesbond007`)
                .expect(404)
                .then((res)=>{
                    expect(res.body.msg).to.equal('username not found')
                })
            })
        })
    })   
})