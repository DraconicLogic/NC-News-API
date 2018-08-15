exports.formatArticleData = (articleData, userDocs) => {
    return articleData.map(articleDatum => {
        const user = userDocs.find((user) => {
            if (user.username === articleDatum.created_by)
            return user
        })
        return { ...articleDatum,
        belongs_to: articleDatum.topic,
        created_by: user._id
        }
    })
}

exports.formatCommentData =  (commentData, userDocs, articleDocs) => {
    return commentData.map((commentDatum) => {
        const user = userDocs.find((user) => {
            if (user.username === commentDatum.created_by)
            return user
        })
        const article = articleDocs.find((article) => {
            if (article.title === commentDatum.belongs_to)
            return article
        })
        return {...commentDatum,
            created_by: user._id,
            belongs_to: article._id
        }
    })
}

