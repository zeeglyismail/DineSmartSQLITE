from django.contrib import admin
from django.contrib.auth.models import Group
from . models import UserAccount

admin.site.unregister(Group)

@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'phone_number', 'name', 'is_staff', 'is_active')
    search_fields = ('email', 'phone_number', 'name')
    list_filter = ('is_staff', 'is_active')
    ordering = ('email',)
    
    def save_model(self, request, obj, form, change):
        """Ensure plaintext passwords entered in the admin are hashed.

        If the admin form provided a password value, use set_password so it is
        stored hashed. If the password field was left blank on change, keep
        the existing password.
        """
        # form.cleaned_data will contain the posted password if provided
        raw_password = None
        try:
            raw_password = form.cleaned_data.get('password')
        except Exception:
            raw_password = None

        if raw_password:
            # If the provided value already looks like a Django hashed password
            # (contains multiple '$' separators), avoid double-hashing it.
            if isinstance(raw_password, str) and raw_password.count('$') > 1:
                # assume it's already hashed and assign directly
                obj.password = raw_password
            else:
                # plaintext password: hash it
                obj.set_password(raw_password)

        super().save_model(request, obj, form, change)