import json
from django.http.response import HttpResponse#,HttpResponseRedirect

#import httplib2
from BeautifulSoup import BeautifulSoup, SoupStrainer, BeautifulStoneSoup
import urllib2

#import xml.dom.minidom
#from xml.dom.minidom import parse, parseString
#import ipdb

#from django.core.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt
import cPickle as pic
from django.utils import simplejson

# Create your views here.
def deals_view(request):
	if request.method == 'GET':
		#stores elements and text as dictionary
		url = "http://rssfeeds.s3.amazonaws.com/goldbox" #scraps data from rss feed url
		req = urllib2.Request(url, headers={'User-Agent' : "Magic Browser"}) 
		con = urllib2.urlopen( req )
		#print con.read()
		soup = BeautifulStoneSoup(con.read())
		item_array = soup.findAll('item')
		data_dict={}
		for index, item in enumerate(item_array):
			try_item_text = item.getText()
			try_item_link=item.find('link').renderContents()
			try_item_description= item.find('description').renderContents()
			try_item_pubdate= item.find('pubdate').renderContents()
			try_item_date= item.find('dc:date').renderContents()
			item_entry={}
			item_entry['text']=try_item_text
			item_entry['link']=try_item_link
			item_entry['description']=try_item_description
			item_entry['pubdate']=try_item_pubdate
			item_entry['date']=try_item_date
			#print "+++++++++++++++New Entry\n"
			#print item_entry
			data_dict[index]=item_entry
		return HttpResponse(json.dumps(data_dict), content_type='application/json')	

@csrf_exempt
def lightning_deals_view(request):
	if request.method =='POST':
		print "Request is POST"
		lightening_deals_obj = simplejson.loads(request.body)
		#saved at same level as db
		fp= open('/home/aameer/Documents/Work/Github/amazondealsapi/lingtening_deals.pic','w')
		pic.dump(lightening_deals_obj,fp)
		fp.close()
		reply_from_server={'deals_status':'saved'}
		return HttpResponse(json.dumps(reply_from_server), content_type='application/json')

def get_lightning_deals(request):
	if request.method =='GET':
		print "Request is GET"
		fp= open('/home/aameer/Documents/Work/Github/amazondealsapi/lingtening_deals.pic','r')
		lightening_deals_from_pic = pic.load(fp)
		return HttpResponse(json.dumps(lightening_deals_from_pic), content_type='application/json')
		
