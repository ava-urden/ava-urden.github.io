// Hjälpfunktion för console-tester
window.findDataLayerEvent = function(name) {
  return (window.dataLayer || []).find(i => i && i.event === name) || null;
};
