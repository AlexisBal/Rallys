from django.db.models.fields import URLField
from rest_framework.response import Response
from oauth2_provider.decorators import protected_resource
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate as django_authenticate, login as django_login

from .models import *
from .serializers import *
    

@api_view(['POST', 'GET'])
def register(request):
    '''
    Inscription.
    {
        "gender": "M",
        "birth_date": "2000-03-11",
        "region": "Ile-de-France",
        "pseudo": "Dupont",
        "email": "test@rallys.fr",
        "password": "Test007"
    }
    '''
    if request.method == 'GET':
        serializer = RegisterSerializer()
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            Profile.objects.create_user(gender=request.data['gender'], birth_date=request.data['birth_date'], first_name=request.data['region'], last_name=request.data['pseudo'], email=request.data['email'], password=request.data['password'])
            user = django_authenticate(email=request.data['email'], password=request.data['password'])
            django_login(user=user, request=request)
            serializer = ProfilesSerializer(user,context={'request': request})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET'])
def login(request):
    '''
    Connexion.
    {
        "email": "test@rallys.fr",
        "password": "Test007"
    }
    '''
    if request.method == 'GET':
        serializer = LoginSerializer()
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        user = django_authenticate(email=request.data['email'], password=request.data['password'])
        if user is not None:
            django_login(user=user, request=request)
            serializer = ProfilesSerializer(user,context={'request': request})
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def user_account(request):
    '''
    Obtenir les informations du compte.
    Nécessite un jeton d'identification !
    '''
    try:
        profile = Profile.objects.get(token=request.META['HTTP_TOKEN'])
        serializer = ProfilesSerializer(profile,context={'request': request})
        id_1 = int(serializer.data['id_user'])
        id_2 = int(request.META['HTTP_USER_ID'])
        if id_1 == id_2:
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def user_account_settings(request):
    '''
    Modification des réglages.
    Nécessite un jeton d'identification !
    {
        "alert_email": false,
        "alert_push": true,
        "pseudo": "Tomdu27",
        "region": "Ile-de-France
    }
    '''
    try:
        profile = Profile.objects.get(token=request.META['HTTP_TOKEN'])
        id_1 = int(profile.id_user)
        id_2 = int(request.META['HTTP_USER_ID'])
        data = request.data
        data["email"] = profile.email
        data["token"] = profile.token 
        data["id_user"] = profile.id_user
        if id_1 == id_2:
            serializer = ProfilesSerializer(profile, data=data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_400_BAD_REQUEST)
       
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def user_account_password(request):
    '''
    Modification du mot de passe.
    Nécessite un jeton d'identification !
    {
        "old-password": "Test007::",
        "password": "Test007",
        "password-confirm": "Test007"
    }
    '''
    try:
        profile = Profile.objects.get(token=request.META['HTTP_TOKEN'])
        id_1 = int(profile.id_user)
        id_2 = int(request.META['HTTP_USER_ID'])
        validator = check_password(request.data['old-password'], profile.password)
        if id_1 == id_2 and validator == True:
            password = request.data['password']
            password_confirm = request.data['password-confirm']
            if password == password_confirm:
                profile.set_password(password)
                profile.save()
                return Response(status=status.HTTP_204_NO_CONTENT)            
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)
       
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def user_account_delete(request):
    '''
    Suppression du compte.
    Nécessite un jeton d'identification !
    {
        "Statut": "Ok"
    }
    '''
    try:
        profile = Profile.objects.get(token=request.META['HTTP_TOKEN'])
        serializer = ProfilesSerializer(profile, context={'request': request})
        id_1 = int(serializer.data['id_user'])
        id_2 = int(request.META['HTTP_USER_ID'])
        if id_1 == id_2:
            profile.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
#@protected_resource()
def users(request):
    '''
    Obtenir un dictionnaire avec tous les utilisateurs.
    Nécessite une clée d'autorisation !
    '''
    data = []
    profiles = Profile.objects.all()
    # Mise à jour de la base de données de Token
    for profile in profiles:
        data.append(profile)
    # Voir les utilisateurs
    serializer = ProfilesSerializer(data,context={'request': request}, many=True)
    return Response({'data': serializer.data})


@api_view(['GET', 'DELETE'])
#@protected_resource()
def user(request, pk):
   # Retrouver, modifier ou supprimer un utilisateur par id/pk
   try:
       profile = Profile.objects.get(pk=pk)
   except Profile.DoesNotExist:
       return Response(status=status.HTTP_404_NOT_FOUND)

   if request.method == 'GET':
        '''
        Chercher un utilisateur par id.
        Nécessite une clée d'autorisation !
        '''
        serializer = ProfilesSerializer(profile,context={'request': request})
        return Response(serializer.data)

   elif request.method == 'DELETE':
        '''
        Supprimer un utilisateur par id.
        Nécessite une clée d'autorisation !
        '''
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
#@protected_resource()
def rallyes(request):
    '''
    Obtenir un dictionnaire avec tous les rallyes.
    Nécessite une clée d'autorisation !
    '''
    data = []
    rallyes = Rallye.objects.all()
    # Mise à jour de la base de données de Token
    for rallye in rallyes:
        data.append(rallye)
    # Voir les utilisateurs
    serializer = RallyesSerializer(data,context={'request': request}, many=True)
    return Response({'data': serializer.data})


@api_view(['GET', 'DELETE'])
#@protected_resource()
def rallye(request, pk):
   # Retrouver ou supprimer un rallye par id/pk
   try:
       rallye = Rallye.objects.get(pk=pk)
   except Rallye.DoesNotExist:
       return Response(status=status.HTTP_404_NOT_FOUND)

   if request.method == 'GET':
        '''
        Chercher un utilisateur par id.
        Nécessite une clée d'autorisation !
        '''
        serializer = RallyesSerializer(rallye,context={'request': request})
        return Response(serializer.data)

   elif request.method == 'DELETE':
        '''
        Supprimer un utilisateur par id.
        Nécessite une clée d'autorisation !
        '''
        rallye.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
