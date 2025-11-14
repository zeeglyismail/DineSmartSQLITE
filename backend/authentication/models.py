from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone

from common.custom_validation import PHONE_REGEX
from common.table_info import TableStatus
from common.models import TimeStamp


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None):
        if email is None or password is None:
            raise ValueError("Email & Password is required")

        user = self.model(
            email=email,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email=email,
            password=password,
        )
        user.is_active = True
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin, TimeStamp):
    phone_number = models.CharField(
        validators=[PHONE_REGEX], max_length=11, unique=True, null=True, blank=True
    )
    email = models.EmailField(max_length=255, unique=True, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)

    class Gender(models.TextChoices):
        male = "male"
        female = "female"
        others = "others"

    gender = models.CharField(
        max_length=10, choices=Gender.choices, null=True, blank=True
    )
    date_of_birth = models.DateField(null=True, blank=True)

    class MaritalStatus(models.TextChoices):
        unmarried = "unmarried"
        married = "married"
        others = "others"

    marital_status = models.CharField(
        max_length=10, choices=MaritalStatus.choices, null=True, blank=True
    )
    nationality = models.CharField(max_length=255, null=True, blank=True)
    occupation = models.CharField(max_length=255, null=True, blank=True)

    is_verified = models.BooleanField(default=False)
    is_customer = models.BooleanField(default=False)

    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"

    objects = UserAccountManager()

    def __str__(self):
        return self.email if self.email else " "

    class Meta:
        verbose_name = "User Account"
        verbose_name_plural = "User Accounts"
        db_table = "user_account"


class Otp(models.Model):
    email = models.EmailField(db_index=True)
    otp = models.CharField(max_length=6)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_expired(self):
        if self.expires_at is None:
            return False
        return timezone.now() > self.expires_at
    
    def __str__(self):
        return self.otp
    
    class Meta:
        verbose_name = "Otp"
        verbose_name_plural = "Otps"
        db_table = "otp"
