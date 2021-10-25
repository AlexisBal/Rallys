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
           'email'
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



class MonitoringsSerializer(serializers.ModelSerializer):
   class Meta:
       model = Monitoring
       fields = (
           'id_monitoring',
           'id_user',
           'sku',
           'stock', 
           'price',
           'limit',
           'creation_date'
       )


class MonitoringSerializer(serializers.ModelSerializer):
   class Meta:
       model = Monitoring
       fields = (
           'id_user',
           'sku',
           'stock', 
           'price',
           'limit'
       )


class ProductsSerializer(serializers.ModelSerializer):
   class Meta:
       model = Products
       fields = (
           'sku',
           'market_place',
           'brand',
           'name',
           'categorie',
           'size',
           'color',
           'request',
           'stock',
           'price', 
           'creation_date',
           'update_date'
       )


class ProductSerializer(serializers.ModelSerializer):
   class Meta:
       model = Products
       fields = (
            'sku',
            'url',
            'market_place',
            'brand',
            'name',
            'categorie',
            'size',
            'color',
            'request',
            'stock',
            'price',
       )

class NewMonitoringProductSerializer(serializers.ModelSerializer):
   class Meta:
       model = Products
       fields = (
            'url',
            'market_place',
            'brand',
            'name',
            'categorie',
            'size',
            'color',
       )




