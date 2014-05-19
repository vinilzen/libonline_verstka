define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        MediaLibItemModel   = require('app/models/MediaLibItem'),

        video_server = 'http://lovidsrv.pandra.ru',
		upload_point = '/upload/',
		media_conf = {
			upload_video:			video_server + upload_point +'uploadVideo/',
			get_video:				video_server + upload_point +'getVideo/',
			get_video_clipart:		video_server + upload_point +'getVideoClipArts/',
			upload_video_clipart:	video_server + upload_point +'uploadVideoClipArt/',
			create_video_folder:	video_server + upload_point +'createVideoFolder/',
			delete_video_folder:	video_server + upload_point +'deleteVideoFolder/',
			delete_video_clipart:	video_server + upload_point +'deleteVideoClipArtFile/',
			delete_video:			video_server + upload_point +'deleteVideoFile/',
			upload_image: 			upload_point+'uploadImage/',
			delete_image:			upload_point+'deleteImageFile/',
			delete_image_clipart:	upload_point+'deleteImageClipArtFile/',
			upload_image_clipart:	upload_point+'uploadImageClipArt/',
			get_image_clipart: 		upload_point+'getClipArts/',
			create_image_folder:	upload_point+'createImageFolder/',
			delete_image_folder:	upload_point+'deleteImageFolder/',
			get_image: 				upload_point+'getImage/',
			upload_audio:			upload_point+'uploadMultimedia/',
			upload_audio_clipart:	upload_point+'uploadMultimediaClipArt/',
			delete_audio:			upload_point+'deleteMultimediaFile/',
			delete_audio_clipart:	upload_point+'deleteMultimediaClipArtFile/',
			get_audio:				upload_point+'getMultimedia/',
			get_audio_clipart:		upload_point+'getMultimediaClipArts/',
			create_audio_folder:	upload_point+'createMultimediaFolder/',
			delete_audio_folder:	upload_point+'deleteMultimediaFolder/',
			set_tag:				upload_point+'setFileTags/'
		},
		curent_folder = '';

	//test !!!
	media_conf.get_image = media_conf.get_audio = media_conf.get_video = '/json/getImage.json';

	var LibView = Backbone.View.extend({
		className:'main',
		initialize:function(){
			this.render();
			this.medialist = $('.select-media', this.$el);
		},
		render:function(){
			this.$el.html(
				'<ul class="filter"><li><a class="active">По имени</a></li><li><a>По дате</a></li><li><a>По размеру</a></li></ul>'+
				'<ul class="select-media"></ul>'
			);
			return this;
		}
	});

	var DirView = Backbone.View.extend({
		className:'dir',
		initialize:function(){
			this.render();
		},
		render:function(){
			this.$el.html(
				'<ul><li class="active">'+
					'<span>Main</span>'+
					'<ul class="user_dir"></ul>'+
				'</li></ul>'
			);
			return this;
		}
	});


    return Backbone.Collection.extend({

    	model:MediaLibItemModel,

	    initialize: function (options) {
            this.type = options.type || 'pictures';

            switch (options.type){
            	case 'micro':
            		this.url = media_conf.get_audio;
            	case 'camera':
            		this.url = media_conf.get_video;
            	case 'prezent': // TODO
            		this.url = media_conf.get_image;
            	case 'pictures':
            	default:
            		this.url = media_conf.get_image;
            }
        },

        render:function(){
            this.view = new LibView();
            this.dir_view = new DirView();

        	this.each(function(model){
        		if (model.get('type') != 'dir') {
        			this.view.medialist.append(model.view.el);
        		} else {
        			$('.user_dir', this.dir_view.$el).append(model.view.el);
        		}
        	}, this);
            
            $('.popover .popover-content').html(this.dir_view.el).append(this.view.el);
        },

        success:function(){
            this.render();
        },

        err:function(){
        	$('.popover .popover-content').html('Ошибка загрузки библиотеки');
        }

    });

});