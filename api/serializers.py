from rest_framework import serializers
from .models import *

class ProfilesSerializer(serializers.ModelSerializer):
   class Meta:
       model = Profile
       fields = (
           'token',
           'id_user', 
           'region',
           'pseudo'
           'birth_date',
           'email',
           'alert_email',
           'alert_push',
           'is_active',
           'admin',
           'staff',
           'last_login',
           'createdAt'
       )


class ProfileSerializer(serializers.ModelSerializer):
   class Meta:
       model = Profile
       fields = (
           'token',
           'id_user', 
           'region',
           'pseudo'
           'birth_date',
           'email',
           'alert_email',
           'alert_push',
           'is_active',
           'admin',
           'staff',
       )


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        
        fields = (
            'gender', 
            'birth_date',
            'region',
            'pseudo',
            'email',
            'password'
    )

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'email',
            'password'
    )


class PropositionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'id_proposition',
            'proposition',
            'creation_date',
            'update_date'
    )


class PropositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'id_proposition'
            'proposition'
    )


class QuestionsSerializer(serializers.ModelSerializer):
    propositions = PropositionSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = (
            'id_question',
            'rang',
            'photo',
            'photo_style',
            'question',
            'propositions',
            'id_reponse',
            'reponse',
            'nb_points',
            'creation_date',
            'update_date'
    )


class QuestionSerializer(serializers.ModelSerializer):
    propositions = PropositionSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = (
            'id_question'
            'rang',
            'photo',
            'photo_style',
            'question',
            'propositions',
            'id_reponse',
            'reponse',
            'nb_points',
    )


class RallyesSerializer(serializers.ModelSerializer):
    authors = ProfilesSerializer(many=True, read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = (
            'id_rallye',
            'authors',
            'adresse',
            'presentation',
            'questions',
            'creation_date',
            'update_date'
    )


