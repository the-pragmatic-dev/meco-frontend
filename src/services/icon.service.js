const { dom, library } = require('@fortawesome/fontawesome-svg-core');
const { faAngleDoubleLeft } = require('@fortawesome/free-solid-svg-icons/faAngleDoubleLeft');
const { faChartArea } = require('@fortawesome/free-solid-svg-icons/faChartArea');
const { faCog } = require('@fortawesome/free-solid-svg-icons/faCog');
const { faInfoCircle } = require('@fortawesome/free-solid-svg-icons/faInfoCircle');
const { faKey } = require('@fortawesome/free-solid-svg-icons/faKey');
const { faLock } = require('@fortawesome/free-solid-svg-icons/faLock');
const { faPuzzlePiece } = require('@fortawesome/free-solid-svg-icons/faPuzzlePiece');
const { faStop } = require('@fortawesome/free-solid-svg-icons/faStop');
const { faExclamationTriangle } = require('@fortawesome/free-solid-svg-icons/faExclamationTriangle');
const { faPoundSign } = require('@fortawesome/free-solid-svg-icons/faPoundSign');
const { faCheckCircle } = require('@fortawesome/free-solid-svg-icons/faCheckCircle');
const { faBars } = require('@fortawesome/free-solid-svg-icons/faBars');

const IconService = {
  load: () => {
    library.add([faAngleDoubleLeft, faChartArea, faCog, faInfoCircle, faKey, faLock, faPuzzlePiece, faStop, faExclamationTriangle, faPoundSign, faCheckCircle, faBars]);
    dom.watch();
  }
};
module.exports = IconService;
