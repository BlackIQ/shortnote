# Generated by Django 3.2.6 on 2021-10-20 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('write', '0006_shortnote_pin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shortnote',
            name='pin',
            field=models.BooleanField(),
        ),
    ]