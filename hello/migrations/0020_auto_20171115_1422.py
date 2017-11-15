# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2017-11-15 14:22
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0019_merge'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductStock',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.FloatField(default=None)),
                ('price', models.FloatField(default=None)),
                ('Type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hello.Type')),
                ('producer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hello.Product')),
            ],
        ),
        migrations.CreateModel(
            name='WeekSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateField()),
                ('end', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='WeekStock',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('totalStock', models.FloatField(default=None)),
                ('maxValue', models.FloatField(default=None)),
                ('avgValue', models.FloatField(default=None)),
                ('minValue', models.FloatField(default=None)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hello.Product')),
                ('weekSettings', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hello.WeekSettings')),
            ],
        ),
        migrations.AddField(
            model_name='productstock',
            name='weekStock',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hello.WeekStock'),
        ),
    ]
