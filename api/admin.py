# accounts.admin.py

from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


from .forms import UserAdminCreationForm, UserAdminChangeForm
from .models import Profile, Proposition, Question, Rallye

class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('id_user', 'gender', 'birth_date', 'region', 'pseudo', 'email', 'admin', 'staff')
    list_filter = ("region", "gender", 'admin', 'staff')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('gender', 'birth_date', 'region', 'pseudo', 'alert_email', 'alert_push')}),
        ('Permissions', {'fields': ('admin', 'staff',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('gender', 'birth_date', 'region', 'pseudo', 'email', 'password1', 'password2')}
        ),
    )
    search_fields = ('email',)
    ordering = ('id_user',)
    filter_horizontal = ()


class PropositionInline(admin.TabularInline):
    model = Proposition
    extra = 1


class QuestionInline(admin.TabularInline):
    propositions = PropositionInline
    model = Question
        


class QuestionAdmin(admin.ModelAdmin):
    inlines = (PropositionInline,)


class RallyeAdmin(admin.ModelAdmin):
    inlines = (QuestionInline, )

admin.site.register(Profile, UserAdmin)
admin.site.register(Rallye, RallyeAdmin)



# Remove Group Model from admin. We're not using it.
admin.site.unregister(Group)