from django.contrib.auth.models import BaseUserManager
from rest_framework.authtoken.models import Token


class UserManager(BaseUserManager):
    def create_user(self, email, gender, birth_date, pseudo, region, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            gender = gender,
            birth_date = birth_date,
            pseudo = pseudo,
            region = region,
            email=self.normalize_email(email)
        )
        user.set_password(password)
        user.save()
        token, created = Token.objects.get_or_create(user=user) # Création d'un token unique
        user.token = token.key
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.model(
            email=self.normalize_email(email)
        )
        user.admin = True
        user.set_password(password)
        user.save()
        token, created = Token.objects.get_or_create(user=user) # Création d'un token unique
        user.token = token.key
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password=None):
        """
        Creates and saves a staffuser with the given email and password.
        """
        user = self.model(
            email=self.normalize_email(email)
        )
        user.staff = True
        user.set_password(password)
        user.save()
        token, created = Token.objects.get_or_create(user=user) # Création d'un token unique
        user.token = token.key
        user.save(using=self._db)
        return user

