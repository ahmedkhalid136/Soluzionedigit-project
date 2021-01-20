const geoip = require('geoip-lite');

exports.isEmpty = function isEmpty(obj) {
    if (obj == null) return true;

    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    if (typeof obj !== "object") return true;

    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

exports.getRequestData = function (req){
    const unknown = '-';
    // browser
    const nAgt = req.headers['user-agent'];
    let browser = '', nameOffset, verOffset, ix;
    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) browser = 'Opera';
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) != -1) browser = 'Opera';
    // Edge
    else if ((verOffset = nAgt.indexOf('Edge')) != -1) browser = 'Microsoft Edge';
    // MSIE
    else if ((verOffset = nAgt.indexOf('MSIE')) != -1) browser = 'Microsoft Internet Explorer';
    // Chrome
    else if ((verOffset = nAgt.indexOf('Chrome')) != -1) browser = 'Chrome';
    // Safari
    else if ((verOffset = nAgt.indexOf('Safari')) != -1) browser = 'Safari';
    // Firefox
    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) browser = 'Firefox';
    // MSIE 11+
    else if (nAgt.indexOf('Trident/') != -1) browser = 'Microsoft Internet Explorer';
    // Other browsers
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) browser = nAgt.substring(nameOffset, verOffset);
    // system
    let os = unknown;
    const clientStrings = [
        {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
        {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
        {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
        {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
        {s:'Windows Vista', r:/Windows NT 6.0/},
        {s:'Windows Server 2003', r:/Windows NT 5.2/},
        {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
        {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
        {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
        {s:'Windows 98', r:/(Windows 98|Win98)/},
        {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
        {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
        {s:'Windows CE', r:/Windows CE/},
        {s:'Windows 3.11', r:/Win16/},
        {s:'Android', r:/Android/},
        {s:'Open BSD', r:/OpenBSD/},
        {s:'Sun OS', r:/SunOS/},
        {s:'Linux', r:/(Linux|X11)/},
        {s:'iOS', r:/(iPhone|iPad|iPod)/},
        {s:'Mac OS X', r:/Mac OS X/},
        {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        {s:'QNX', r:/QNX/},
        {s:'UNIX', r:/UNIX/},
        {s:'BeOS', r:/BeOS/},
        {s:'OS/2', r:/OS\/2/},
        {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];
    for (let id in clientStrings) {
      let cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
        }
    }
  
    const geo = geoip.lookup(req.ip);
  
    let refer = (req.get('Referer'))?req.get('Referer'):'Direct Link';
    if(refer.toLowerCase().indexOf('facebook') != -1) {
        if(nAgt.toLowerCase().indexOf('facebook') != -1) refer = 'Facebook';
        if(browser.toLowerCase().indexOf('messenger') != -1) refer = 'Messenger by Facebook';
        else refer = 'Facebook';
    }
    if(refer.toLowerCase().indexOf('instagram') != -1) refer = 'Instagram';
    if(nAgt.toLowerCase().indexOf('instagram') != -1) refer = 'Instagram';
  
    return {system: {browser: browser, os: os}, geo: geo, refer: refer};
  };