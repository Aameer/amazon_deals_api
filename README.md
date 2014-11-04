amazon_deals_api
================

The project is a working model of an API which can get deals from amazon (including the lightening deals)
Requirements
------------
* python 2.7.4
* django 1.5.4
* beautifulsoup 3.2.1
* django-cors-headers

Configration
------------
Setup it just like a usual django project, just make sure you enter right location for saving the dump of lightenting deal data.

Some Important details
----------------------
In this project we have used @csrf\_exempt, you can use csrf based on your need. We are using django-cors-headers for this project, there are several other ways to implement CORS check this [article](http://aameer.github.io/articles/cross-origin-resource-sharing-cors/) for more details.
The data dump for the lightening deals is taken with the help of the javascript snippet.To get the lates dump paste `script_get_amazon_lightneing_deals.js` present inside `amazonparser/static/js/` in the cosole of link [here](http://www.amazon.com/gp/goldbox) (http://www.amazon.com/gp/goldbox)

To test if you have configured everything correctly, run the server `python manage.py runserver` and check the following links
*http://localhost:8000/get_deals/*
**This link will give deals which we get from RSS feed present [here](http://rssfeeds.s3.amazonaws.com/goldbox)**
*http://localhost:8000/get_lightning_deals/*
**This link will give lightening deals which we get by js script and save in pickle format as lingtening\_deals.pic**

For CORS we are allowing all the domains you can configure it to allow only specific domains for more details check [django-cors-headers](https://github.com/ottoyiu/django-cors-headers)*
