from django.db import models


class IngredientModel(models.Model):
    food = models.CharField(max_length=100)
    weight = models.PositiveSmallIntegerField(default=1)
    calories = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    priority = models.BooleanField(default=True)
    thumbnail = models.URLField(max_length=200, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, help_text="Price of the ingredient")
    picture = models.ImageField(
        upload_to='ingredient_images/', blank=True, null=True,
        help_text="Image of the ingredient."
    )
    def __str__(self):
        return f"{self.food}-(ings_id{self.id})-{self.price}"
    
    def get_picture_url(self, obj):
        request = self.context.get('request')
        if obj.picture and hasattr(obj.picture, 'url'):
            return request.build_absolute_uri(obj.picture.url)
        return None

    class Meta:
        verbose_name = "Ingredient"
        verbose_name_plural = "Ingredients"
        db_table = "ingredient"
