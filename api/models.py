from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.db.models.fields import IntegerField

from .managers import UserManager


class Profile(AbstractBaseUser):
    id_user = models.AutoField(verbose_name="Id user", primary_key=True, unique=True, null=False)
    gender = models.CharField(verbose_name="Gender", max_length=1, null=True, default=None)
    birth_date = models.DateField(verbose_name="Birth date", null=True, default=None)
    pseudo = models.CharField(verbose_name="Pseudo", max_length=60, null=True, default=None)
    region = models.CharField(verbose_name="Region", max_length=255, null=True, default=None)
    email = models.EmailField(verbose_name="Email", max_length=255, unique=True)
    alert_email = models.BooleanField(default=True)
    alert_push = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    token = models.CharField(verbose_name="Token", max_length=255, unique=True, default=None,  null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []  # Email & Password are required by default.

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a member of admin?"
        return self.admin

    class Meta:
        db_table = "rallys_users"


class Historique(models.Model):
    id_action = models.AutoField(
        verbose_name="Id Action", primary_key=True, null=False, unique=True
    )
    user = models.ForeignKey(Profile, related_name="Historique", on_delete=models.CASCADE)
    id_rallye = IntegerField(null=False)
    is_active = models.BooleanField(default=True)
    avancee = IntegerField(default=0);
    score = IntegerField(default=0);
    creation_date = models.DateTimeField("Created At", auto_now_add=True)
    update_date = models.DateTimeField("Updated At", auto_now=True)

    class Meta:
        db_table = "rallys_historique"

    

class Rallye(models.Model):
    id_rallye = models.AutoField(
        verbose_name="Id Rallye", primary_key=True, null=False, unique=True
    )
    authors = models.ManyToManyField(Profile)
    adresse = models.CharField(verbose_name="Adresse", max_length=255, null=True, default=None)
    presentation = models.CharField(verbose_name="Presentation", max_length=255, null=True, default=None)
    creation_date = models.DateTimeField("Created At", auto_now_add=True)
    update_date = models.DateTimeField("Updated At", auto_now=True)

    class Meta:
        db_table = "rallys_rallyes"


class Question(models.Model):
    id_question = models.AutoField(
        verbose_name="Id Question", primary_key=True, null=False, unique=True
    )
    rallye = models.ForeignKey(Rallye, related_name="Questions", on_delete=models.CASCADE)
    rang = models.IntegerField(
        verbose_name="Rang", null=False, unique=False
    )
    photo = models.CharField(verbose_name="Photo", max_length=255, null=True, default=None)
    photo_style = models.CharField(verbose_name="Photo style", max_length=255, null=True, default=None)
    question = models.CharField(verbose_name="Question", max_length=255, null=False)
    id_reponse = IntegerField(verbose_name="Id Reponse", null=False)
    reponse = models.CharField(verbose_name="Reponse", max_length=255, null=False)
    nb_points = IntegerField(verbose_name="Id Reponse", null=False)
    creation_date = models.DateTimeField("Created At", auto_now_add=True)
    update_date = models.DateTimeField("Updated At", auto_now=True)

    class Meta:
        unique_together = ['rallye', 'rang']
        db_table = "rallys_questions"


class Proposition(models.Model):
    id_proposition = models.AutoField(
        verbose_name="Id Proposition", primary_key=True, null=False, unique=True
    )
    question = models.ForeignKey(Question, related_name="Propositions", on_delete=models.CASCADE)
    proposition = models.CharField(verbose_name="Proposition", max_length=255, null=False)
    creation_date = models.DateTimeField("Created At", auto_now_add=True)
    update_date = models.DateTimeField("Updated At", auto_now=True)

    class Meta:
        db_table = "rallys_propositions"