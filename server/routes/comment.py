from flask import session, request
from flask_restful import Resource
from ..config import api, db
from ..models import Comment, Episode, Podcast 

class CommentByEpisodeId(Resource):
    # get all comments for an episode 
    def get(self, id):
        comments = Comment.query.filter_by(episode_id = id).order_by(Comment.id.desc()).all()
        return [comment.to_dict() for comment in comments], 200

    # add a comment to an episode
    def post(self, id):
        text = request.json['text']
        comment = Comment(
            episode_id = id,
            user_id = session['user_id'],
            text = text
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict(), 201

api.add_resource(CommentByEpisodeId, '/api/comment/episode/<int:id>')

class CommentById(Resource):
    # update comment
    def patch(self, id):
        text = request.json['text']
        comment = Comment.query.filter_by(id=id).first()
        comment.text = text
        db.session.commit()
        return {}, 204

    # delete comment
    def delete(self, id):
        Comment.query.filter_by(id=id).delete()
        db.session.commit()
        return {'id': id}, 204

api.add_resource(CommentById, '/api/comment/<int:id>')