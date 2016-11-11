(function() {
  videojs.plugin('socialShare', function(opts) {
    opts = opts || {};
    var player = this;
    var _ss;
    var fbIcon = '<svg class="vjs-social-share-svg" xmlns="http://www.w3.org/2000/svg" role="presentation" width="36" height="36" viewBox="0 0 36 36" preserveAspectRatio="xMinYMin meet"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.4 0h25.2c3 0 5.4 2.4 5.4 5.4v25.2c0 3-2.4 5.4-5.4 5.4h-25.2c-3 0-5.4-2.4-5.4-5.4v-25.2c0-3 2.4-5.4 5.4-5.4z"></path><path fill="#fff" d="M19.4 28v-9.2h4l.6-3.3h-4.6v-2.4c0-1.1.3-1.8 2-1.8h2.6v-3.1c-.4 0-1.1-.2-2.6-.2-3.1 0-5.7 1.8-5.7 5v2.5h-3.7v3.3h3.7v9.2h3.7z"></path></svg>';
    var twIcon = '<svg class="vjs-social-share-svg" xmlns="http://www.w3.org/2000/svg" role="presentation" width="36" height="36" viewBox="0 0 36 36" preserveAspectRatio="xMinYMin meet"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.4 0h25.2c3 0 5.4 2.4 5.4 5.4v25.2c0 3-2.4 5.4-5.4 5.4h-25.2c-3 0-5.4-2.4-5.4-5.4v-25.2c0-3 2.4-5.4 5.4-5.4z"></path><path fill="#fff" d="M28.2 12.3c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.5.7-2.4.9-.7-.7-1.7-1.2-2.8-1.2-2.1 0-3.8 1.7-3.8 3.8 0 .3 0 .6.1.9-3.1-.2-5.9-1.7-7.8-3.9-.3.6-.5 1.2-.5 1.9 0 1.3.7 2.5 1.7 3.1-.6 0-1.2-.2-1.7-.5 0 1.8 1.3 3.3 3 3.7-.3.1-.6.1-1 .1-.2 0-.5 0-.7-.1.5 1.5 1.9 2.6 3.5 2.6-1.3 1-2.9 1.6-4.7 1.6-.3 0-.6 0-.9-.1 1.7 1.1 3.6 1.7 5.8 1.7 6.9 0 10.7-5.7 10.7-10.7v-.5c.8-.4 1.5-1 2-1.8z"></path></svg>';
    var shareIcon = '<svg class="vjs-social-share-svg" xmlns="http://www.w3.org/2000/svg" role="presentation" width="36" height="36" viewBox="0 0 36 36" preserveAspectRatio="xMinYMin meet"><path fill-rule="evenodd" clip-rule="evenodd" d="M31.949,431.711c0,20.078,16.264,36.34,36.34,36.34h363.421  c20.078,0,36.34-16.262,36.34-36.34V68.29c0-20.077-16.262-36.34-36.34-36.34H68.29c-20.077,0-36.34,16.264-36.34,36.34V431.711z   M113.718,250c0-30.074,24.438-54.513,54.513-54.513c12.536,0,24.075,4.268,33.253,11.268l75.949-34.434  c-0.176-1.366-0.176-2.724-0.176-4.09c0-30.075,24.435-54.513,54.514-54.513c30.078,0,54.513,24.438,54.513,54.513  c0,30.072-24.435,54.513-54.513,54.513c-13.992,0-26.808-5.271-36.433-13.992l-73.229,33.255c0.453,2.635,0.634,5.269,0.634,7.993  c0,2.725-0.182,5.36-0.634,7.994l73.229,33.164c9.625-8.631,22.44-13.9,36.433-13.9c30.078,0,54.513,24.435,54.513,54.514  c0,30.078-24.435,54.513-54.513,54.513c-30.079,0-54.514-24.435-54.514-54.513c0-1.368,0-2.725,0.176-4.093l-75.949-34.521  c-9.178,7.087-20.717,11.355-33.253,11.355C138.156,304.513,113.718,280.078,113.718,250z"></path></svg>';

    function launchTweet(e) {
      e.preventDefault();

      window.open(
        'http://twitter.com/intent/tweet' +
          '?text=' + encodeURIComponent(opts.twitter.shareText ? opts.twitter.shareText : '') +
          '&url=' + encodeURIComponent(opts.twitter.shareUrl ? opts.twitter.shareUrl : window.location.href) +
          '&via=' + (opts.twitter.handle ? opts.twitter.handle : ''),
        'Share This Video to Twitter',
        'width=600,height=300,left=' + Math.ceil((window.innerWidth / 2) - 300) + ',top=' +
          Math.ceil((window.innerHeight / 2) - 127)
      );
    }

    function launchFacebook(e) {
      e.preventDefault();
      var url = opts.facebook.shareUrl ? opts.facebook.shareUrl : window.location.href;

      if (typeof FB !== 'undefined') {
        FB.ui({
          method: 'share',
          href: url,
          picture: opts.facebook.shareImage ? opts.facebook.shareImage : '',
          name: '',
          caption: '',
          description: opts.facebook.shareText ? opts.facebook.shareText : ''
        }, function (response) {
        });
      } else if (!!document.querySelector('meta[property="fb:app_id"]')) {
        window.open(
          'https://www.facebook.com/dialog/share' +
            '?app_id=' + document.querySelector('meta[property="fb:app_id"]').content +
            '&display=popup' +
            '&href=' + encodeURIComponent(url) +
            '&redirect_uri=' + encodeURIComponent(url),
          'Share This Video to Facebook',
          'width=600,height=300,left=' + Math.ceil((window.innerWidth / 2) - 300) + ',top=' +
            Math.ceil((window.innerHeight / 2) - 127)
        );
      } else {
        this.style.display = 'none';
      }
    }

    function launchOverlayVideo() {
      $('.overlay').show();
      $('.vjs-social-share-link').hide();
      player.pause();
    }

    function constructSocialShareContent() {
      var _frag = document.createDocumentFragment();
      var _aside = document.createElement('aside');
      var _button;

      _button = document.createElement('a');
      _button.className = 'vjs-social-share-link';
      _button.setAttribute('data-network', 'shareBtn');
      _button.innerHTML = shareIcon;
      // _button.addEventListener('click', launchTweet, false);
      _aside.appendChild(_button);
      console.log(_button);

      if (opts.twitter) {
        _button = document.createElement('a');
        _button.className = 'vjs-social-share-link';
        _button.setAttribute('data-network', 'twitter');
        _button.innerHTML = twIcon;
        _button.addEventListener('click', launchTweet, false);
        _aside.appendChild(_button);
      }
      if (opts.facebook) {
        _button = document.createElement('a');
        _button.className = 'vjs-social-share-link';
        _button.setAttribute('data-network', 'overlay');
        _button.innerHTML = fbIcon;
        _button.addEventListener('click', launchOverlayVideo, false);
        _aside.appendChild(_button);
      }

      _aside.className = 'vjs-social-share';
      _ss = _aside;
      _frag.appendChild(_aside);
      player.el().appendChild(_frag);
    }

    player.on('mouseover', function() {
      _ss.classList.add('is-visible');
    });

    player.ready(function() {
      console.log(opts);
      if (opts.facebook || opts.twitter) {
        constructSocialShareContent();
      }
    });

  });
}());

