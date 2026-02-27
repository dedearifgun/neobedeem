/**
 * YouTube Player Modal Handler
 * Simple reusable module for YouTube video playback in Bootstrap modals
 */

const YouTubePlayerModal = (function() {
  // Private variables
  let ytPlayer = null;
  let ytApiReady = false;
  let config = {};
  let callbackInterval = null;
  let currentTimeStart = 0;
  let currentTimeEnd = null;

  // Private methods
  function updateProgress() {
    if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
      const currentTime = ytPlayer.getCurrentTime();
      if (currentTime < currentTimeStart) {
        ytPlayer.seekTo(currentTimeStart, true);
      } else if (currentTime >= currentTimeEnd) {
        ytPlayer.stopVideo();
        resetProgressBar();
        return;
      }
      const clipProgress = (currentTime - currentTimeStart) / (currentTimeEnd - currentTimeStart) * 100;
      const progressPercent = Math.max(0, Math.min(100, clipProgress));
      $(config.progressBarSelector).css('width', progressPercent + '%');    
    } else if (ytPlayer.getPlayerState() === YT.PlayerState.ENDED) {
      ytPlayer.stopVideo();
      resetProgressBar();
    }
  }

  function startCallback() {
    // Clear any existing interval
    if (callbackInterval) {
      clearInterval(callbackInterval);
    }

    callbackInterval = setInterval(() => {
      updateProgress();
    }, config.updateInterval);
  }

  function removePlayer() {
    if (ytPlayer) {
      ytPlayer.destroy();
      ytPlayer = null;
    }    
  }

  function stopProgressUpdate() {
    if (callbackInterval) {
      clearInterval(callbackInterval);
      callbackInterval = null;
    }
  }

  function resetProgressBar() {
    if (config.progressBarSelector) {
      $(config.progressBarSelector).css('width', '0%');
    }    
  }

  function handleModalTrigger(e) {
    e.preventDefault();
    
    const videoId   = $(this).data('yt-video-id');
    const title     = $(this).data('title');
    const videoUrl  = $(this).data('url');
    const timeStart = Number($(this).data('time-start')) || 0;
    const timeEnd   = Number($(this).data('time-end')) || undefined;

    // Store time values for progress calculation
    currentTimeStart = timeStart;
    currentTimeEnd = timeEnd;

    $(config.modalTitleSelector).text(title).attr('href', videoUrl);
    $(config.copyLinkSelector).data('copy-value', window.location.host + videoUrl);
    $(config.modalId).modal('show');

    $(config.modalId).one('shown.bs.modal', function () {
      if (!ytApiReady || !videoId) {
        console.error('YouTube API not ready or invalid video ID');
        return;
      }

      // Reset
      removePlayer();
      stopProgressUpdate();

      ytPlayer = new YT.Player(config.containerId, {
        width: config.playerWidth,
        height: config.playerHeight,
        videoId: videoId,
        playerVars: {
          autoplay: config.autoplay ? 1 : 0,
          start: timeStart,
          end: timeEnd,
          controls: 1,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1
        },
        events: {
          'onError': (event) => {
            console.error('YouTube player error:', event.data);
            stopProgressUpdate();
            if (config.onError) {
              config.onError(event);
            } else if (typeof toastr !== 'undefined') {
              toastr.error('Failed to load video');
            }
          },
          'onReady': (event) => {
            console.log('YouTube player ready');
            
            // If timeEnd is not set, use video duration
            if (!currentTimeEnd) {
              const duration = event.target.getDuration();
              currentTimeEnd = duration;
            }

            // Start progress updates
            startCallback();

            if (config.onReady) {
              config.onReady(event);
            }
          },
          'onStateChange': (event) => {
            // Update on play/pause/seek
            updateProgress();
            
            if (config.onStateChange) {
              config.onStateChange(event);
            }
          }
        }
      });
    });
  }

  function handleModalHidden() {
    removePlayer();
    stopProgressUpdate();
    resetProgressBar();

    $(`#${config.containerId}`).empty();
    
    // Reset time values
    currentTimeStart = 0;
    currentTimeEnd = null;
    
    if (config.onModalClose) {
      config.onModalClose();
    }
  }

  // Public API
  return {
    init: function(options = {}) {
      // Default configuration
      config = {
        modalId: '#yt-video-modal',
        containerId: 'yt-video-player',
        triggerClass: '.video-modal-trigger',
        modalTitleSelector: '#neobdm-video-url',
        copyLinkSelector: '#neobdm-copy-video-url',
        playerWidth: '100%',
        playerHeight: '500',
        autoplay: false,
        progressBarSelector: "#yt-video-progress-bar",
        updateInterval: 500,
        onError: null,
        onReady: null,
        onStateChange: null,
        onModalClose: null,
        ...options
      };

      // Attach event listeners
      $(document).on('click', config.triggerClass, handleModalTrigger);
      $(document).on('hidden.bs.modal', config.modalId, handleModalHidden);
    },

    // Expose callback for YouTube API
    onYouTubeIframeAPIReady: function() {
      ytApiReady = true;
      console.log('YouTube API ready');
    },

    // Get current player instance
    getPlayer: function() {
      return ytPlayer;
    },

    // Manually destroy player
    destroy: function() {
      removePlayer();
      stopProgressUpdate();
    }
  };
})();

// Make callback available globally for YouTube API
window.onYouTubeIframeAPIReady = function() {
  YouTubePlayerModal.onYouTubeIframeAPIReady();
};
