// TODO
(function () {
  h.clear();

  const appId = 'PIP-SNAKE';
  const intervalId = setInterval(tick, 1000);

  function tick() {
    h.clear();
    h.setFontAlign(0, 0).drawString('Pip-Snake', 160, 120);
  }

  function onKnob1(direction) {
    // Handle knob
  }

  Pip.onExclusive('knob1', onKnob1);

  tick();

  return {
    id: appId,
    notDefault: true,
    fullscreen: true,
    remove: function () {
      Pip.removeListener('knob1', onKnob1);
      clearInterval(intervalId);
      Pip.audioStop();
      h.clear();
    },
  };
});
