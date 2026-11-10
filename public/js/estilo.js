var $c=Object.create;var ro=Object.defineProperty;var Qc=Object.getOwnPropertyDescriptor;var el=Object.getOwnPropertyNames;var tl=Object.getPrototypeOf,nl=Object.prototype.hasOwnProperty;var ai=(l=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(l,{get:(e,t)=>(typeof require<"u"?require:e)[t]}):l)(function(l){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+l+'" is not supported')});var il=(l,e)=>()=>{try{return e||l((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}};var sl=(l,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of el(e))!nl.call(l,i)&&i!==t&&ro(l,i,{get:()=>e[i],enumerable:!(n=Qc(e,i))||n.enumerable});return l};var rl=(l,e,t)=>(t=l!=null?$c(tl(l)):{},sl(e||!l||!l.__esModule?ro(t,"default",{value:l,enumerable:!0}):t,l));var Gc=il((zc,to)=>{(function(l){typeof zc=="object"&&typeof to<"u"?to.exports=l():typeof define=="function"&&define.amd?define([],l):(typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:this).JSZip=l()})(function(){return(function l(e,t,n){function i(a,o){if(!t[a]){if(!e[a]){var c=typeof ai=="function"&&ai;if(!o&&c)return c(a,!0);if(s)return s(a,!0);var h=new Error("Cannot find module '"+a+"'");throw h.code="MODULE_NOT_FOUND",h}var u=t[a]={exports:{}};e[a][0].call(u.exports,function(d){var f=e[a][1][d];return i(f||d)},u,u.exports,l,e,t,n)}return t[a].exports}for(var s=typeof ai=="function"&&ai,r=0;r<n.length;r++)i(n[r]);return i})({1:[function(l,e,t){"use strict";var n=l("./utils"),i=l("./support"),s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.encode=function(r){for(var a,o,c,h,u,d,f,p=[],m=0,g=r.length,_=g,v=n.getTypeOf(r)!=="string";m<r.length;)_=g-m,c=v?(a=r[m++],o=m<g?r[m++]:0,m<g?r[m++]:0):(a=r.charCodeAt(m++),o=m<g?r.charCodeAt(m++):0,m<g?r.charCodeAt(m++):0),h=a>>2,u=(3&a)<<4|o>>4,d=1<_?(15&o)<<2|c>>6:64,f=2<_?63&c:64,p.push(s.charAt(h)+s.charAt(u)+s.charAt(d)+s.charAt(f));return p.join("")},t.decode=function(r){var a,o,c,h,u,d,f=0,p=0,m="data:";if(r.substr(0,m.length)===m)throw new Error("Invalid base64 input, it looks like a data url.");var g,_=3*(r=r.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(r.charAt(r.length-1)===s.charAt(64)&&_--,r.charAt(r.length-2)===s.charAt(64)&&_--,_%1!=0)throw new Error("Invalid base64 input, bad content length.");for(g=i.uint8array?new Uint8Array(0|_):new Array(0|_);f<r.length;)a=s.indexOf(r.charAt(f++))<<2|(h=s.indexOf(r.charAt(f++)))>>4,o=(15&h)<<4|(u=s.indexOf(r.charAt(f++)))>>2,c=(3&u)<<6|(d=s.indexOf(r.charAt(f++))),g[p++]=a,u!==64&&(g[p++]=o),d!==64&&(g[p++]=c);return g}},{"./support":30,"./utils":32}],2:[function(l,e,t){"use strict";var n=l("./external"),i=l("./stream/DataWorker"),s=l("./stream/Crc32Probe"),r=l("./stream/DataLengthProbe");function a(o,c,h,u,d){this.compressedSize=o,this.uncompressedSize=c,this.crc32=h,this.compression=u,this.compressedContent=d}a.prototype={getContentWorker:function(){var o=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new r("data_length")),c=this;return o.on("end",function(){if(this.streamInfo.data_length!==c.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),o},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},a.createWorkerFrom=function(o,c,h){return o.pipe(new s).pipe(new r("uncompressedSize")).pipe(c.compressWorker(h)).pipe(new r("compressedSize")).withStreamInfo("compression",c)},e.exports=a},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(l,e,t){"use strict";var n=l("./stream/GenericWorker");t.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},t.DEFLATE=l("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(l,e,t){"use strict";var n=l("./utils"),i=(function(){for(var s,r=[],a=0;a<256;a++){s=a;for(var o=0;o<8;o++)s=1&s?3988292384^s>>>1:s>>>1;r[a]=s}return r})();e.exports=function(s,r){return s!==void 0&&s.length?n.getTypeOf(s)!=="string"?(function(a,o,c,h){var u=i,d=h+c;a^=-1;for(var f=h;f<d;f++)a=a>>>8^u[255&(a^o[f])];return-1^a})(0|r,s,s.length,0):(function(a,o,c,h){var u=i,d=h+c;a^=-1;for(var f=h;f<d;f++)a=a>>>8^u[255&(a^o.charCodeAt(f))];return-1^a})(0|r,s,s.length,0):0}},{"./utils":32}],5:[function(l,e,t){"use strict";t.base64=!1,t.binary=!1,t.dir=!1,t.createFolders=!0,t.date=null,t.compression=null,t.compressionOptions=null,t.comment=null,t.unixPermissions=null,t.dosPermissions=null},{}],6:[function(l,e,t){"use strict";var n=null;n=typeof Promise<"u"?Promise:l("lie"),e.exports={Promise:n}},{lie:37}],7:[function(l,e,t){"use strict";var n=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",i=l("pako"),s=l("./utils"),r=l("./stream/GenericWorker"),a=n?"uint8array":"array";function o(c,h){r.call(this,"FlateWorker/"+c),this._pako=null,this._pakoAction=c,this._pakoOptions=h,this.meta={}}t.magic="\b\0",s.inherits(o,r),o.prototype.processChunk=function(c){this.meta=c.meta,this._pako===null&&this._createPako(),this._pako.push(s.transformTo(a,c.data),!1)},o.prototype.flush=function(){r.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},o.prototype.cleanUp=function(){r.prototype.cleanUp.call(this),this._pako=null},o.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var c=this;this._pako.onData=function(h){c.push({data:h,meta:c.meta})}},t.compressWorker=function(c){return new o("Deflate",c)},t.uncompressWorker=function(){return new o("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(l,e,t){"use strict";function n(u,d){var f,p="";for(f=0;f<d;f++)p+=String.fromCharCode(255&u),u>>>=8;return p}function i(u,d,f,p,m,g){var _,v,b=u.file,S=u.compression,w=g!==a.utf8encode,T=s.transformTo("string",g(b.name)),E=s.transformTo("string",a.utf8encode(b.name)),I=b.comment,L=s.transformTo("string",g(I)),M=s.transformTo("string",a.utf8encode(I)),C=E.length!==b.name.length,y=M.length!==I.length,F="",j="",O="",G=b.dir,k=b.date,Y={crc32:0,compressedSize:0,uncompressedSize:0};d&&!f||(Y.crc32=u.crc32,Y.compressedSize=u.compressedSize,Y.uncompressedSize=u.uncompressedSize);var P=0;d&&(P|=8),w||!C&&!y||(P|=2048);var N=0,K=0;G&&(N|=16),m==="UNIX"?(K=798,N|=(function(H,te){var ee=H;return H||(ee=te?16893:33204),(65535&ee)<<16})(b.unixPermissions,G)):(K=20,N|=(function(H){return 63&(H||0)})(b.dosPermissions)),_=k.getUTCHours(),_<<=6,_|=k.getUTCMinutes(),_<<=5,_|=k.getUTCSeconds()/2,v=k.getUTCFullYear()-1980,v<<=4,v|=k.getUTCMonth()+1,v<<=5,v|=k.getUTCDate(),C&&(j=n(1,1)+n(o(T),4)+E,F+="up"+n(j.length,2)+j),y&&(O=n(1,1)+n(o(L),4)+M,F+="uc"+n(O.length,2)+O);var X="";return X+=`
\0`,X+=n(P,2),X+=S.magic,X+=n(_,2),X+=n(v,2),X+=n(Y.crc32,4),X+=n(Y.compressedSize,4),X+=n(Y.uncompressedSize,4),X+=n(T.length,2),X+=n(F.length,2),{fileRecord:c.LOCAL_FILE_HEADER+X+T+F,dirRecord:c.CENTRAL_FILE_HEADER+n(K,2)+X+n(L.length,2)+"\0\0\0\0"+n(N,4)+n(p,4)+T+F+L}}var s=l("../utils"),r=l("../stream/GenericWorker"),a=l("../utf8"),o=l("../crc32"),c=l("../signature");function h(u,d,f,p){r.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=d,this.zipPlatform=f,this.encodeFileName=p,this.streamFiles=u,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}s.inherits(h,r),h.prototype.push=function(u){var d=u.meta.percent||0,f=this.entriesCount,p=this._sources.length;this.accumulate?this.contentBuffer.push(u):(this.bytesWritten+=u.data.length,r.prototype.push.call(this,{data:u.data,meta:{currentFile:this.currentFile,percent:f?(d+100*(f-p-1))/f:100}}))},h.prototype.openedSource=function(u){this.currentSourceOffset=this.bytesWritten,this.currentFile=u.file.name;var d=this.streamFiles&&!u.file.dir;if(d){var f=i(u,d,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:f.fileRecord,meta:{percent:0}})}else this.accumulate=!0},h.prototype.closedSource=function(u){this.accumulate=!1;var d=this.streamFiles&&!u.file.dir,f=i(u,d,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(f.dirRecord),d)this.push({data:(function(p){return c.DATA_DESCRIPTOR+n(p.crc32,4)+n(p.compressedSize,4)+n(p.uncompressedSize,4)})(u),meta:{percent:100}});else for(this.push({data:f.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},h.prototype.flush=function(){for(var u=this.bytesWritten,d=0;d<this.dirRecords.length;d++)this.push({data:this.dirRecords[d],meta:{percent:100}});var f=this.bytesWritten-u,p=(function(m,g,_,v,b){var S=s.transformTo("string",b(v));return c.CENTRAL_DIRECTORY_END+"\0\0\0\0"+n(m,2)+n(m,2)+n(g,4)+n(_,4)+n(S.length,2)+S})(this.dirRecords.length,f,u,this.zipComment,this.encodeFileName);this.push({data:p,meta:{percent:100}})},h.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},h.prototype.registerPrevious=function(u){this._sources.push(u);var d=this;return u.on("data",function(f){d.processChunk(f)}),u.on("end",function(){d.closedSource(d.previous.streamInfo),d._sources.length?d.prepareNextSource():d.end()}),u.on("error",function(f){d.error(f)}),this},h.prototype.resume=function(){return!!r.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},h.prototype.error=function(u){var d=this._sources;if(!r.prototype.error.call(this,u))return!1;for(var f=0;f<d.length;f++)try{d[f].error(u)}catch{}return!0},h.prototype.lock=function(){r.prototype.lock.call(this);for(var u=this._sources,d=0;d<u.length;d++)u[d].lock()},e.exports=h},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(l,e,t){"use strict";var n=l("../compressions"),i=l("./ZipFileWorker");t.generateWorker=function(s,r,a){var o=new i(r.streamFiles,a,r.platform,r.encodeFileName),c=0;try{s.forEach(function(h,u){c++;var d=(function(g,_){var v=g||_,b=n[v];if(!b)throw new Error(v+" is not a valid compression method !");return b})(u.options.compression,r.compression),f=u.options.compressionOptions||r.compressionOptions||{},p=u.dir,m=u.date;u._compressWorker(d,f).withStreamInfo("file",{name:h,dir:p,date:m,comment:u.comment||"",unixPermissions:u.unixPermissions,dosPermissions:u.dosPermissions}).pipe(o)}),o.entriesCount=c}catch(h){o.error(h)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(l,e,t){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var i=new n;for(var s in this)typeof this[s]!="function"&&(i[s]=this[s]);return i}}(n.prototype=l("./object")).loadAsync=l("./load"),n.support=l("./support"),n.defaults=l("./defaults"),n.version="3.10.2",n.loadAsync=function(i,s){return new n().loadAsync(i,s)},n.external=l("./external"),e.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(l,e,t){"use strict";var n=l("./utils"),i=l("./external"),s=l("./utf8"),r=l("./zipEntries"),a=l("./stream/Crc32Probe"),o=l("./nodejsUtils");function c(h){return new i.Promise(function(u,d){var f=h.decompressed.getContentWorker().pipe(new a);f.on("error",function(p){d(p)}).on("end",function(){f.streamInfo.crc32!==h.decompressed.crc32?d(new Error("Corrupted zip : CRC32 mismatch")):u()}).resume()})}e.exports=function(h,u){var d=this;return u=n.extend(u||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:s.utf8decode}),o.isNode&&o.isStream(h)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):n.prepareContent("the loaded zip file",h,!0,u.optimizedBinaryString,u.base64).then(function(f){var p=new r(u);return p.load(f),p}).then(function(f){var p=[i.Promise.resolve(f)],m=f.files;if(u.checkCRC32)for(var g=0;g<m.length;g++)p.push(c(m[g]));return i.Promise.all(p)}).then(function(f){for(var p=f.shift(),m=p.files,g=0;g<m.length;g++){var _=m[g],v=_.fileNameStr,b=n.resolve(_.fileNameStr);d.file(b,_.decompressed,{binary:!0,optimizedBinaryString:!0,date:_.date,dir:_.dir,comment:_.fileCommentStr.length?_.fileCommentStr:null,unixPermissions:_.unixPermissions,dosPermissions:_.dosPermissions,createFolders:u.createFolders}),_.dir||(d.file(b).unsafeOriginalName=v)}return p.zipComment.length&&(d.comment=p.zipComment),d})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(l,e,t){"use strict";var n=l("../utils"),i=l("../stream/GenericWorker");function s(r,a){i.call(this,"Nodejs stream input adapter for "+r),this._upstreamEnded=!1,this._bindStream(a)}n.inherits(s,i),s.prototype._bindStream=function(r){var a=this;(this._stream=r).pause(),r.on("data",function(o){a.push({data:o,meta:{percent:0}})}).on("error",function(o){a.isPaused?this.generatedError=o:a.error(o)}).on("end",function(){a.isPaused?a._upstreamEnded=!0:a.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},e.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(l,e,t){"use strict";var n=l("readable-stream").Readable;function i(s,r,a){n.call(this,r),this._helper=s;var o=this;s.on("data",function(c,h){o.push(c)||o._helper.pause(),a&&a(h)}).on("error",function(c){o.emit("error",c)}).on("end",function(){o.push(null)})}l("../utils").inherits(i,n),i.prototype._read=function(){this._helper.resume()},e.exports=i},{"../utils":32,"readable-stream":16}],14:[function(l,e,t){"use strict";e.exports={isNode:typeof Buffer<"u",newBufferFrom:function(n,i){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(n,i);if(typeof n=="number")throw new Error('The "data" argument must not be a number');return new Buffer(n,i)},allocBuffer:function(n){if(Buffer.alloc)return Buffer.alloc(n);var i=new Buffer(n);return i.fill(0),i},isBuffer:function(n){return Buffer.isBuffer(n)},isStream:function(n){return n&&typeof n.on=="function"&&typeof n.pause=="function"&&typeof n.resume=="function"}}},{}],15:[function(l,e,t){"use strict";function n(b,S,w){var T,E=s.getTypeOf(S),I=s.extend(w||{},o);I.date=I.date||new Date,I.compression!==null&&(I.compression=I.compression.toUpperCase()),typeof I.unixPermissions=="string"&&(I.unixPermissions=parseInt(I.unixPermissions,8)),I.unixPermissions&&16384&I.unixPermissions&&(I.dir=!0),I.dosPermissions&&16&I.dosPermissions&&(I.dir=!0),I.dir&&(b=m(b)),I.createFolders&&(T=p(b))&&g.call(this,T,!0);var L=E==="string"&&I.binary===!1&&I.base64===!1;w&&w.binary!==void 0||(I.binary=!L),(S instanceof c&&S.uncompressedSize===0||I.dir||!S||S.length===0)&&(I.base64=!1,I.binary=!0,S="",I.compression="STORE",E="string");var M=null;M=S instanceof c||S instanceof r?S:d.isNode&&d.isStream(S)?new f(b,S):s.prepareContent(b,S,I.binary,I.optimizedBinaryString,I.base64);var C=new h(b,M,I);this.files[b]=C}var i=l("./utf8"),s=l("./utils"),r=l("./stream/GenericWorker"),a=l("./stream/StreamHelper"),o=l("./defaults"),c=l("./compressedObject"),h=l("./zipObject"),u=l("./generate"),d=l("./nodejsUtils"),f=l("./nodejs/NodejsStreamInputAdapter"),p=function(b){b.slice(-1)==="/"&&(b=b.substring(0,b.length-1));var S=b.lastIndexOf("/");return 0<S?b.substring(0,S):""},m=function(b){return b.slice(-1)!=="/"&&(b+="/"),b},g=function(b,S){return S=S!==void 0?S:o.createFolders,b=m(b),this.files[b]||n.call(this,b,null,{dir:!0,createFolders:S}),this.files[b]};function _(b){return Object.prototype.toString.call(b)==="[object RegExp]"}var v={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(b){var S,w,T;for(S in this.files)T=this.files[S],(w=S.slice(this.root.length,S.length))&&S.slice(0,this.root.length)===this.root&&b(w,T)},filter:function(b){var S=[];return this.forEach(function(w,T){b(w,T)&&S.push(T)}),S},file:function(b,S,w){if(arguments.length!==1)return b=this.root+b,n.call(this,b,S,w),this;if(_(b)){var T=b;return this.filter(function(I,L){return!L.dir&&T.test(I)})}var E=this.files[this.root+b];return E&&!E.dir?E:null},folder:function(b){if(!b)return this;if(_(b))return this.filter(function(E,I){return I.dir&&b.test(E)});var S=this.root+b,w=g.call(this,S),T=this.clone();return T.root=w.name,T},remove:function(b){b=this.root+b;var S=this.files[b];if(S||(b.slice(-1)!=="/"&&(b+="/"),S=this.files[b]),S&&!S.dir)delete this.files[b];else for(var w=this.filter(function(E,I){return I.name.slice(0,b.length)===b}),T=0;T<w.length;T++)delete this.files[w[T].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(b){var S,w={};try{if((w=s.extend(b||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=w.type.toLowerCase(),w.compression=w.compression.toUpperCase(),w.type==="binarystring"&&(w.type="string"),!w.type)throw new Error("No output type specified.");s.checkSupport(w.type),w.platform!=="darwin"&&w.platform!=="freebsd"&&w.platform!=="linux"&&w.platform!=="sunos"||(w.platform="UNIX"),w.platform==="win32"&&(w.platform="DOS");var T=w.comment||this.comment||"";S=u.generateWorker(this,w,T)}catch(E){(S=new r("error")).error(E)}return new a(S,w.type||"string",w.mimeType)},generateAsync:function(b,S){return this.generateInternalStream(b).accumulate(S)},generateNodeStream:function(b,S){return(b=b||{}).type||(b.type="nodebuffer"),this.generateInternalStream(b).toNodejsStream(S)}};e.exports=v},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(l,e,t){"use strict";e.exports=l("stream")},{stream:void 0}],17:[function(l,e,t){"use strict";var n=l("./DataReader");function i(s){n.call(this,s);for(var r=0;r<this.data.length;r++)s[r]=255&s[r]}l("../utils").inherits(i,n),i.prototype.byteAt=function(s){return this.data[this.zero+s]},i.prototype.lastIndexOfSignature=function(s){for(var r=s.charCodeAt(0),a=s.charCodeAt(1),o=s.charCodeAt(2),c=s.charCodeAt(3),h=this.length-4;0<=h;--h)if(this.data[h]===r&&this.data[h+1]===a&&this.data[h+2]===o&&this.data[h+3]===c)return h-this.zero;return-1},i.prototype.readAndCheckSignature=function(s){var r=s.charCodeAt(0),a=s.charCodeAt(1),o=s.charCodeAt(2),c=s.charCodeAt(3),h=this.readData(4);return r===h[0]&&a===h[1]&&o===h[2]&&c===h[3]},i.prototype.readData=function(s){if(this.checkOffset(s),s===0)return[];var r=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,r},e.exports=i},{"../utils":32,"./DataReader":18}],18:[function(l,e,t){"use strict";var n=l("../utils");function i(s){this.data=s,this.length=s.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(s){this.checkIndex(this.index+s)},checkIndex:function(s){if(this.length<this.zero+s||s<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+s+"). Corrupted zip ?")},setIndex:function(s){this.checkIndex(s),this.index=s},skip:function(s){this.setIndex(this.index+s)},byteAt:function(){},readInt:function(s){var r,a=0;for(this.checkOffset(s),r=this.index+s-1;r>=this.index;r--)a=(a<<8)+this.byteAt(r);return this.index+=s,a},readString:function(s){return n.transformTo("string",this.readData(s))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var s=this.readInt(4);return new Date(Date.UTC(1980+(s>>25&127),(s>>21&15)-1,s>>16&31,s>>11&31,s>>5&63,(31&s)<<1))}},e.exports=i},{"../utils":32}],19:[function(l,e,t){"use strict";var n=l("./Uint8ArrayReader");function i(s){n.call(this,s)}l("../utils").inherits(i,n),i.prototype.readData=function(s){this.checkOffset(s);var r=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,r},e.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(l,e,t){"use strict";var n=l("./DataReader");function i(s){n.call(this,s)}l("../utils").inherits(i,n),i.prototype.byteAt=function(s){return this.data.charCodeAt(this.zero+s)},i.prototype.lastIndexOfSignature=function(s){return this.data.lastIndexOf(s)-this.zero},i.prototype.readAndCheckSignature=function(s){return s===this.readData(4)},i.prototype.readData=function(s){this.checkOffset(s);var r=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,r},e.exports=i},{"../utils":32,"./DataReader":18}],21:[function(l,e,t){"use strict";var n=l("./ArrayReader");function i(s){n.call(this,s)}l("../utils").inherits(i,n),i.prototype.readData=function(s){if(this.checkOffset(s),s===0)return new Uint8Array(0);var r=this.data.subarray(this.zero+this.index,this.zero+this.index+s);return this.index+=s,r},e.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(l,e,t){"use strict";var n=l("../utils"),i=l("../support"),s=l("./ArrayReader"),r=l("./StringReader"),a=l("./NodeBufferReader"),o=l("./Uint8ArrayReader");e.exports=function(c){var h=n.getTypeOf(c);return n.checkSupport(h),h!=="string"||i.uint8array?h==="nodebuffer"?new a(c):i.uint8array?new o(n.transformTo("uint8array",c)):new s(n.transformTo("array",c)):new r(c)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(l,e,t){"use strict";t.LOCAL_FILE_HEADER="PK",t.CENTRAL_FILE_HEADER="PK",t.CENTRAL_DIRECTORY_END="PK",t.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",t.ZIP64_CENTRAL_DIRECTORY_END="PK",t.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(l,e,t){"use strict";var n=l("./GenericWorker"),i=l("../utils");function s(r){n.call(this,"ConvertWorker to "+r),this.destType=r}i.inherits(s,n),s.prototype.processChunk=function(r){this.push({data:i.transformTo(this.destType,r.data),meta:r.meta})},e.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(l,e,t){"use strict";var n=l("./GenericWorker"),i=l("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}l("../utils").inherits(s,n),s.prototype.processChunk=function(r){this.streamInfo.crc32=i(r.data,this.streamInfo.crc32||0),this.push(r)},e.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(l,e,t){"use strict";var n=l("../utils"),i=l("./GenericWorker");function s(r){i.call(this,"DataLengthProbe for "+r),this.propName=r,this.withStreamInfo(r,0)}n.inherits(s,i),s.prototype.processChunk=function(r){if(r){var a=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=a+r.data.length}i.prototype.processChunk.call(this,r)},e.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(l,e,t){"use strict";var n=l("../utils"),i=l("./GenericWorker");function s(r){i.call(this,"DataWorker");var a=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,r.then(function(o){a.dataIsReady=!0,a.data=o,a.max=o&&o.length||0,a.type=n.getTypeOf(o),a.isPaused||a._tickAndRepeat()},function(o){a.error(o)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var r=null,a=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":r=this.data.substring(this.index,a);break;case"uint8array":r=this.data.subarray(this.index,a);break;case"array":case"nodebuffer":r=this.data.slice(this.index,a)}return this.index=a,this.push({data:r,meta:{percent:this.max?this.index/this.max*100:0}})},e.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(l,e,t){"use strict";function n(i){this.name=i||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(i){this.emit("data",i)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(i){this.emit("error",i)}return!0},error:function(i){return!this.isFinished&&(this.isPaused?this.generatedError=i:(this.isFinished=!0,this.emit("error",i),this.previous&&this.previous.error(i),this.cleanUp()),!0)},on:function(i,s){return this._listeners[i].push(s),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(i,s){if(this._listeners[i])for(var r=0;r<this._listeners[i].length;r++)this._listeners[i][r].call(this,s)},pipe:function(i){return i.registerPrevious(this)},registerPrevious:function(i){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=i.streamInfo,this.mergeStreamInfo(),this.previous=i;var s=this;return i.on("data",function(r){s.processChunk(r)}),i.on("end",function(){s.end()}),i.on("error",function(r){s.error(r)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var i=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),i=!0),this.previous&&this.previous.resume(),!i},flush:function(){},processChunk:function(i){this.push(i)},withStreamInfo:function(i,s){return this.extraStreamInfo[i]=s,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var i in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,i)&&(this.streamInfo[i]=this.extraStreamInfo[i])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var i="Worker "+this.name;return this.previous?this.previous+" -> "+i:i}},e.exports=n},{}],29:[function(l,e,t){"use strict";var n=l("../utils"),i=l("./ConvertWorker"),s=l("./GenericWorker"),r=l("../base64"),a=l("../support"),o=l("../external"),c=null;if(a.nodestream)try{c=l("../nodejs/NodejsStreamOutputAdapter")}catch{}function h(d,f){return new o.Promise(function(p,m){var g=[],_=d._internalType,v=d._outputType,b=d._mimeType;d.on("data",function(S,w){g.push(S),f&&f(w)}).on("error",function(S){g=[],m(S)}).on("end",function(){try{var S=(function(w,T,E){switch(w){case"blob":return n.newBlob(n.transformTo("arraybuffer",T),E);case"base64":return r.encode(T);default:return n.transformTo(w,T)}})(v,(function(w,T){var E,I=0,L=null,M=0;for(E=0;E<T.length;E++)M+=T[E].length;switch(w){case"string":return T.join("");case"array":return Array.prototype.concat.apply([],T);case"uint8array":for(L=new Uint8Array(M),E=0;E<T.length;E++)L.set(T[E],I),I+=T[E].length;return L;case"nodebuffer":return Buffer.concat(T);default:throw new Error("concat : unsupported type '"+w+"'")}})(_,g),b);p(S)}catch(w){m(w)}g=[]}).resume()})}function u(d,f,p){var m=f;switch(f){case"blob":case"arraybuffer":m="uint8array";break;case"base64":m="string"}try{this._internalType=m,this._outputType=f,this._mimeType=p,n.checkSupport(m),this._worker=d.pipe(new i(m)),d.lock()}catch(g){this._worker=new s("error"),this._worker.error(g)}}u.prototype={accumulate:function(d){return h(this,d)},on:function(d,f){var p=this;return d==="data"?this._worker.on(d,function(m){f.call(p,m.data,m.meta)}):this._worker.on(d,function(){n.delay(f,arguments,p)}),this},resume:function(){return n.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(d){if(n.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new c(this,{objectMode:this._outputType!=="nodebuffer"},d)}},e.exports=u},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(l,e,t){"use strict";if(t.base64=!0,t.array=!0,t.string=!0,t.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",t.nodebuffer=typeof Buffer<"u",t.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")t.blob=!1;else{var n=new ArrayBuffer(0);try{t.blob=new Blob([n],{type:"application/zip"}).size===0}catch{try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),t.blob=i.getBlob("application/zip").size===0}catch{t.blob=!1}}}try{t.nodestream=!!l("readable-stream").Readable}catch{t.nodestream=!1}},{"readable-stream":16}],31:[function(l,e,t){"use strict";for(var n=l("./utils"),i=l("./support"),s=l("./nodejsUtils"),r=l("./stream/GenericWorker"),a=new Array(256),o=0;o<256;o++)a[o]=252<=o?6:248<=o?5:240<=o?4:224<=o?3:192<=o?2:1;a[254]=a[254]=1;function c(){r.call(this,"utf-8 decode"),this.leftOver=null}function h(){r.call(this,"utf-8 encode")}t.utf8encode=function(u){return i.nodebuffer?s.newBufferFrom(u,"utf-8"):(function(d){var f,p,m,g,_,v=d.length,b=0;for(g=0;g<v;g++)(64512&(p=d.charCodeAt(g)))==55296&&g+1<v&&(64512&(m=d.charCodeAt(g+1)))==56320&&(p=65536+(p-55296<<10)+(m-56320),g++),b+=p<128?1:p<2048?2:p<65536?3:4;for(f=i.uint8array?new Uint8Array(b):new Array(b),g=_=0;_<b;g++)(64512&(p=d.charCodeAt(g)))==55296&&g+1<v&&(64512&(m=d.charCodeAt(g+1)))==56320&&(p=65536+(p-55296<<10)+(m-56320),g++),p<128?f[_++]=p:(p<2048?f[_++]=192|p>>>6:(p<65536?f[_++]=224|p>>>12:(f[_++]=240|p>>>18,f[_++]=128|p>>>12&63),f[_++]=128|p>>>6&63),f[_++]=128|63&p);return f})(u)},t.utf8decode=function(u){return i.nodebuffer?n.transformTo("nodebuffer",u).toString("utf-8"):(function(d){var f,p,m,g,_=d.length,v=new Array(2*_);for(f=p=0;f<_;)if((m=d[f++])<128)v[p++]=m;else if(4<(g=a[m]))v[p++]=65533,f+=g-1;else{for(m&=g===2?31:g===3?15:7;1<g&&f<_;)m=m<<6|63&d[f++],g--;1<g?v[p++]=65533:m<65536?v[p++]=m:(m-=65536,v[p++]=55296|m>>10&1023,v[p++]=56320|1023&m)}return v.length!==p&&(v.subarray?v=v.subarray(0,p):v.length=p),n.applyFromCharCode(v)})(u=n.transformTo(i.uint8array?"uint8array":"array",u))},n.inherits(c,r),c.prototype.processChunk=function(u){var d=n.transformTo(i.uint8array?"uint8array":"array",u.data);if(this.leftOver&&this.leftOver.length){if(i.uint8array){var f=d;(d=new Uint8Array(f.length+this.leftOver.length)).set(this.leftOver,0),d.set(f,this.leftOver.length)}else d=this.leftOver.concat(d);this.leftOver=null}var p=(function(g,_){var v;for((_=_||g.length)>g.length&&(_=g.length),v=_-1;0<=v&&(192&g[v])==128;)v--;return v<0||v===0?_:v+a[g[v]]>_?v:_})(d),m=d;p!==d.length&&(i.uint8array?(m=d.subarray(0,p),this.leftOver=d.subarray(p,d.length)):(m=d.slice(0,p),this.leftOver=d.slice(p,d.length))),this.push({data:t.utf8decode(m),meta:u.meta})},c.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:t.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},t.Utf8DecodeWorker=c,n.inherits(h,r),h.prototype.processChunk=function(u){this.push({data:t.utf8encode(u.data),meta:u.meta})},t.Utf8EncodeWorker=h},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(l,e,t){"use strict";var n=l("./support"),i=l("./base64"),s=l("./nodejsUtils"),r=l("./external");function a(f){return f}function o(f,p){for(var m=0;m<f.length;++m)p[m]=255&f.charCodeAt(m);return p}l("setimmediate"),t.newBlob=function(f,p){t.checkSupport("blob");try{return new Blob([f],{type:p})}catch{try{var m=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return m.append(f),m.getBlob(p)}catch{throw new Error("Bug : can't construct the Blob.")}}};var c={stringifyByChunk:function(f,p,m){var g=[],_=0,v=f.length;if(v<=m)return String.fromCharCode.apply(null,f);for(;_<v;)p==="array"||p==="nodebuffer"?g.push(String.fromCharCode.apply(null,f.slice(_,Math.min(_+m,v)))):g.push(String.fromCharCode.apply(null,f.subarray(_,Math.min(_+m,v)))),_+=m;return g.join("")},stringifyByChar:function(f){for(var p="",m=0;m<f.length;m++)p+=String.fromCharCode(f[m]);return p},applyCanBeUsed:{uint8array:(function(){try{return n.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}})(),nodebuffer:(function(){try{return n.nodebuffer&&String.fromCharCode.apply(null,s.allocBuffer(1)).length===1}catch{return!1}})()}};function h(f){var p=65536,m=t.getTypeOf(f),g=!0;if(m==="uint8array"?g=c.applyCanBeUsed.uint8array:m==="nodebuffer"&&(g=c.applyCanBeUsed.nodebuffer),g)for(;1<p;)try{return c.stringifyByChunk(f,m,p)}catch{p=Math.floor(p/2)}return c.stringifyByChar(f)}function u(f,p){for(var m=0;m<f.length;m++)p[m]=f[m];return p}t.applyFromCharCode=h;var d={};d.string={string:a,array:function(f){return o(f,new Array(f.length))},arraybuffer:function(f){return d.string.uint8array(f).buffer},uint8array:function(f){return o(f,new Uint8Array(f.length))},nodebuffer:function(f){return o(f,s.allocBuffer(f.length))}},d.array={string:h,array:a,arraybuffer:function(f){return new Uint8Array(f).buffer},uint8array:function(f){return new Uint8Array(f)},nodebuffer:function(f){return s.newBufferFrom(f)}},d.arraybuffer={string:function(f){return h(new Uint8Array(f))},array:function(f){return u(new Uint8Array(f),new Array(f.byteLength))},arraybuffer:a,uint8array:function(f){return new Uint8Array(f)},nodebuffer:function(f){return s.newBufferFrom(new Uint8Array(f))}},d.uint8array={string:h,array:function(f){return u(f,new Array(f.length))},arraybuffer:function(f){return f.buffer},uint8array:a,nodebuffer:function(f){return s.newBufferFrom(f)}},d.nodebuffer={string:h,array:function(f){return u(f,new Array(f.length))},arraybuffer:function(f){return d.nodebuffer.uint8array(f).buffer},uint8array:function(f){return u(f,new Uint8Array(f.length))},nodebuffer:a},t.transformTo=function(f,p){if(p=p||"",!f)return p;t.checkSupport(f);var m=t.getTypeOf(p);return d[m][f](p)},t.resolve=function(f){for(var p=f.split("/"),m=[],g=0;g<p.length;g++){var _=p[g];_==="."||_===""&&g!==0&&g!==p.length-1||(_===".."?m.pop():m.push(_))}return m.join("/")},t.getTypeOf=function(f){if(typeof f=="string")return"string";var p=Object.prototype.toString.call(f);return p==="[object Array]"?"array":n.nodebuffer&&s.isBuffer(f)?"nodebuffer":n.uint8array&&p==="[object Uint8Array]"?"uint8array":n.arraybuffer&&p==="[object ArrayBuffer]"?"arraybuffer":void 0},t.checkSupport=function(f){if(!n[f.toLowerCase()])throw new Error(f+" is not supported by this platform")},t.MAX_VALUE_16BITS=65535,t.MAX_VALUE_32BITS=-1,t.pretty=function(f){var p,m,g="";for(m=0;m<(f||"").length;m++)g+="\\x"+((p=f.charCodeAt(m))<16?"0":"")+p.toString(16).toUpperCase();return g},t.delay=function(f,p,m){setImmediate(function(){f.apply(m||null,p||[])})},t.inherits=function(f,p){function m(){}m.prototype=p.prototype,f.prototype=new m},t.extend=function(){var f,p,m={};for(f=0;f<arguments.length;f++)for(p in arguments[f])Object.prototype.hasOwnProperty.call(arguments[f],p)&&m[p]===void 0&&(m[p]=arguments[f][p]);return m},t.prepareContent=function(f,p,m,g,_){return r.Promise.resolve(p).then(function(v){return n.blob&&(v instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(v))!==-1)?Blob.prototype.arrayBuffer!==void 0?v.arrayBuffer():typeof FileReader<"u"?new r.Promise(function(b,S){var w=new FileReader;w.onload=function(T){b(T.target.result)},w.onerror=function(T){S(T.target.error)},w.readAsArrayBuffer(v)}):r.Promise.reject(new Error(f+" is a Blob, but we have no way of reading it.")):v}).then(function(v){var b=t.getTypeOf(v);return b?(b==="arraybuffer"?v=t.transformTo("uint8array",v):b==="string"&&(_?v=i.decode(v):m&&g!==!0&&(v=(function(S){return o(S,n.uint8array?new Uint8Array(S.length):new Array(S.length))})(v))),v):r.Promise.reject(new Error("Can't read the data of '"+f+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(l,e,t){"use strict";var n=l("./reader/readerFor"),i=l("./utils"),s=l("./signature"),r=l("./zipEntry"),a=l("./support");function o(c){this.files=[],this.loadOptions=c}o.prototype={checkSignature:function(c){if(!this.reader.readAndCheckSignature(c)){this.reader.index-=4;var h=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(h)+", expected "+i.pretty(c)+")")}},isSignature:function(c,h){var u=this.reader.index;this.reader.setIndex(c);var d=this.reader.readString(4)===h;return this.reader.setIndex(u),d},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var c=this.reader.readData(this.zipCommentLength),h=a.uint8array?"uint8array":"array",u=i.transformTo(h,c);this.zipComment=this.loadOptions.decodeFileName(u)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var c,h,u,d=this.zip64EndOfCentralSize-44;0<d;)c=this.reader.readInt(2),h=this.reader.readInt(4),u=this.reader.readData(h),this.zip64ExtensibleData[c]={id:c,length:h,value:u}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var c,h;for(c=0;c<this.files.length;c++)h=this.files[c],this.reader.setIndex(h.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),h.readLocalPart(this.reader),h.handleUTF8(),h.processAttributes()},readCentralDir:function(){var c;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(c=new r({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(c);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var c=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(c<0)throw this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(c);var h=c;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(c=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(c),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var u=this.centralDirOffset+this.centralDirSize;this.zip64&&(u+=20,u+=12+this.zip64EndOfCentralSize);var d=h-u;if(0<d)this.isSignature(h,s.CENTRAL_FILE_HEADER)||(this.reader.zero=d);else if(d<0)throw new Error("Corrupted zip: missing "+Math.abs(d)+" bytes.")},prepareReader:function(c){this.reader=n(c)},load:function(c){this.prepareReader(c),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},e.exports=o},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(l,e,t){"use strict";var n=l("./reader/readerFor"),i=l("./utils"),s=l("./compressedObject"),r=l("./crc32"),a=l("./utf8"),o=l("./compressions"),c=l("./support");function h(u,d){this.options=u,this.loadOptions=d}h.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(u){var d,f;if(u.skip(22),this.fileNameLength=u.readInt(2),f=u.readInt(2),this.fileName=u.readData(this.fileNameLength),u.skip(f),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((d=(function(p){for(var m in o)if(Object.prototype.hasOwnProperty.call(o,m)&&o[m].magic===p)return o[m];return null})(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+i.pretty(this.compressionMethod)+" unknown (inner file : "+i.transformTo("string",this.fileName)+")");this.decompressed=new s(this.compressedSize,this.uncompressedSize,this.crc32,d,u.readData(this.compressedSize))},readCentralPart:function(u){this.versionMadeBy=u.readInt(2),u.skip(2),this.bitFlag=u.readInt(2),this.compressionMethod=u.readString(2),this.date=u.readDate(),this.crc32=u.readInt(4),this.compressedSize=u.readInt(4),this.uncompressedSize=u.readInt(4);var d=u.readInt(2);if(this.extraFieldsLength=u.readInt(2),this.fileCommentLength=u.readInt(2),this.diskNumberStart=u.readInt(2),this.internalFileAttributes=u.readInt(2),this.externalFileAttributes=u.readInt(4),this.localHeaderOffset=u.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");u.skip(d),this.readExtraFields(u),this.parseZIP64ExtraField(u),this.fileComment=u.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var u=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),u==0&&(this.dosPermissions=63&this.externalFileAttributes),u==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var u=n(this.extraFields[1].value);this.uncompressedSize===i.MAX_VALUE_32BITS&&(this.uncompressedSize=u.readInt(8)),this.compressedSize===i.MAX_VALUE_32BITS&&(this.compressedSize=u.readInt(8)),this.localHeaderOffset===i.MAX_VALUE_32BITS&&(this.localHeaderOffset=u.readInt(8)),this.diskNumberStart===i.MAX_VALUE_32BITS&&(this.diskNumberStart=u.readInt(4))}},readExtraFields:function(u){var d,f,p,m=u.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});u.index+4<m;)d=u.readInt(2),f=u.readInt(2),p=u.readData(f),this.extraFields[d]={id:d,length:f,value:p};u.setIndex(m)},handleUTF8:function(){var u=c.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=a.utf8decode(this.fileName),this.fileCommentStr=a.utf8decode(this.fileComment);else{var d=this.findExtraFieldUnicodePath();if(d!==null)this.fileNameStr=d;else{var f=i.transformTo(u,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(f)}var p=this.findExtraFieldUnicodeComment();if(p!==null)this.fileCommentStr=p;else{var m=i.transformTo(u,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(m)}}},findExtraFieldUnicodePath:function(){var u=this.extraFields[28789];if(u){var d=n(u.value);return d.readInt(1)!==1||r(this.fileName)!==d.readInt(4)?null:a.utf8decode(d.readData(u.length-5))}return null},findExtraFieldUnicodeComment:function(){var u=this.extraFields[25461];if(u){var d=n(u.value);return d.readInt(1)!==1||r(this.fileComment)!==d.readInt(4)?null:a.utf8decode(d.readData(u.length-5))}return null}},e.exports=h},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(l,e,t){"use strict";function n(d,f,p){this.name=d,this.dir=p.dir,this.date=p.date,this.comment=p.comment,this.unixPermissions=p.unixPermissions,this.dosPermissions=p.dosPermissions,this._data=f,this._dataBinary=p.binary,this.options={compression:p.compression,compressionOptions:p.compressionOptions}}var i=l("./stream/StreamHelper"),s=l("./stream/DataWorker"),r=l("./utf8"),a=l("./compressedObject"),o=l("./stream/GenericWorker");n.prototype={internalStream:function(d){var f=null,p="string";try{if(!d)throw new Error("No output type specified.");var m=(p=d.toLowerCase())==="string"||p==="text";p!=="binarystring"&&p!=="text"||(p="string"),f=this._decompressWorker();var g=!this._dataBinary;g&&!m&&(f=f.pipe(new r.Utf8EncodeWorker)),!g&&m&&(f=f.pipe(new r.Utf8DecodeWorker))}catch(_){(f=new o("error")).error(_)}return new i(f,p,"")},async:function(d,f){return this.internalStream(d).accumulate(f)},nodeStream:function(d,f){return this.internalStream(d||"nodebuffer").toNodejsStream(f)},_compressWorker:function(d,f){if(this._data instanceof a&&this._data.compression.magic===d.magic)return this._data.getCompressedWorker();var p=this._decompressWorker();return this._dataBinary||(p=p.pipe(new r.Utf8EncodeWorker)),a.createWorkerFrom(p,d,f)},_decompressWorker:function(){return this._data instanceof a?this._data.getContentWorker():this._data instanceof o?this._data:new s(this._data)}};for(var c=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],h=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},u=0;u<c.length;u++)n.prototype[c[u]]=h;e.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(l,e,t){(function(n){"use strict";var i,s,r=n.MutationObserver||n.WebKitMutationObserver;if(r){var a=0,o=new r(d),c=n.document.createTextNode("");o.observe(c,{characterData:!0}),i=function(){c.data=a=++a%2}}else if(n.setImmediate||n.MessageChannel===void 0)i="document"in n&&"onreadystatechange"in n.document.createElement("script")?function(){var f=n.document.createElement("script");f.onreadystatechange=function(){d(),f.onreadystatechange=null,f.parentNode.removeChild(f),f=null},n.document.documentElement.appendChild(f)}:function(){setTimeout(d,0)};else{var h=new n.MessageChannel;h.port1.onmessage=d,i=function(){h.port2.postMessage(0)}}var u=[];function d(){var f,p;s=!0;for(var m=u.length;m;){for(p=u,u=[],f=-1;++f<m;)p[f]();m=u.length}s=!1}e.exports=function(f){u.push(f)!==1||s||i()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(l,e,t){"use strict";var n=l("immediate");function i(){}var s={},r=["REJECTED"],a=["FULFILLED"],o=["PENDING"];function c(m){if(typeof m!="function")throw new TypeError("resolver must be a function");this.state=o,this.queue=[],this.outcome=void 0,m!==i&&f(this,m)}function h(m,g,_){this.promise=m,typeof g=="function"&&(this.onFulfilled=g,this.callFulfilled=this.otherCallFulfilled),typeof _=="function"&&(this.onRejected=_,this.callRejected=this.otherCallRejected)}function u(m,g,_){n(function(){var v;try{v=g(_)}catch(b){return s.reject(m,b)}v===m?s.reject(m,new TypeError("Cannot resolve promise with itself")):s.resolve(m,v)})}function d(m){var g=m&&m.then;if(m&&(typeof m=="object"||typeof m=="function")&&typeof g=="function")return function(){g.apply(m,arguments)}}function f(m,g){var _=!1;function v(w){_||(_=!0,s.reject(m,w))}function b(w){_||(_=!0,s.resolve(m,w))}var S=p(function(){g(b,v)});S.status==="error"&&v(S.value)}function p(m,g){var _={};try{_.value=m(g),_.status="success"}catch(v){_.status="error",_.value=v}return _}(e.exports=c).prototype.finally=function(m){if(typeof m!="function")return this;var g=this.constructor;return this.then(function(_){return g.resolve(m()).then(function(){return _})},function(_){return g.resolve(m()).then(function(){throw _})})},c.prototype.catch=function(m){return this.then(null,m)},c.prototype.then=function(m,g){if(typeof m!="function"&&this.state===a||typeof g!="function"&&this.state===r)return this;var _=new this.constructor(i);return this.state!==o?u(_,this.state===a?m:g,this.outcome):this.queue.push(new h(_,m,g)),_},h.prototype.callFulfilled=function(m){s.resolve(this.promise,m)},h.prototype.otherCallFulfilled=function(m){u(this.promise,this.onFulfilled,m)},h.prototype.callRejected=function(m){s.reject(this.promise,m)},h.prototype.otherCallRejected=function(m){u(this.promise,this.onRejected,m)},s.resolve=function(m,g){var _=p(d,g);if(_.status==="error")return s.reject(m,_.value);var v=_.value;if(v)f(m,v);else{m.state=a,m.outcome=g;for(var b=-1,S=m.queue.length;++b<S;)m.queue[b].callFulfilled(g)}return m},s.reject=function(m,g){m.state=r,m.outcome=g;for(var _=-1,v=m.queue.length;++_<v;)m.queue[_].callRejected(g);return m},c.resolve=function(m){return m instanceof this?m:s.resolve(new this(i),m)},c.reject=function(m){var g=new this(i);return s.reject(g,m)},c.all=function(m){var g=this;if(Object.prototype.toString.call(m)!=="[object Array]")return this.reject(new TypeError("must be an array"));var _=m.length,v=!1;if(!_)return this.resolve([]);for(var b=new Array(_),S=0,w=-1,T=new this(i);++w<_;)E(m[w],w);return T;function E(I,L){g.resolve(I).then(function(M){b[L]=M,++S!==_||v||(v=!0,s.resolve(T,b))},function(M){v||(v=!0,s.reject(T,M))})}},c.race=function(m){var g=this;if(Object.prototype.toString.call(m)!=="[object Array]")return this.reject(new TypeError("must be an array"));var _=m.length,v=!1;if(!_)return this.resolve([]);for(var b=-1,S=new this(i);++b<_;)w=m[b],g.resolve(w).then(function(T){v||(v=!0,s.resolve(S,T))},function(T){v||(v=!0,s.reject(S,T))});var w;return S}},{immediate:36}],38:[function(l,e,t){"use strict";var n={};(0,l("./lib/utils/common").assign)(n,l("./lib/deflate"),l("./lib/inflate"),l("./lib/zlib/constants")),e.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(l,e,t){"use strict";var n=l("./zlib/deflate"),i=l("./utils/common"),s=l("./utils/strings"),r=l("./zlib/messages"),a=l("./zlib/zstream"),o=Object.prototype.toString,c=0,h=-1,u=0,d=8;function f(m){if(!(this instanceof f))return new f(m);this.options=i.assign({level:h,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:u,to:""},m||{});var g=this.options;g.raw&&0<g.windowBits?g.windowBits=-g.windowBits:g.gzip&&0<g.windowBits&&g.windowBits<16&&(g.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new a,this.strm.avail_out=0;var _=n.deflateInit2(this.strm,g.level,g.method,g.windowBits,g.memLevel,g.strategy);if(_!==c)throw new Error(r[_]);if(g.header&&n.deflateSetHeader(this.strm,g.header),g.dictionary){var v;if(v=typeof g.dictionary=="string"?s.string2buf(g.dictionary):o.call(g.dictionary)==="[object ArrayBuffer]"?new Uint8Array(g.dictionary):g.dictionary,(_=n.deflateSetDictionary(this.strm,v))!==c)throw new Error(r[_]);this._dict_set=!0}}function p(m,g){var _=new f(g);if(_.push(m,!0),_.err)throw _.msg||r[_.err];return _.result}f.prototype.push=function(m,g){var _,v,b=this.strm,S=this.options.chunkSize;if(this.ended)return!1;v=g===~~g?g:g===!0?4:0,typeof m=="string"?b.input=s.string2buf(m):o.call(m)==="[object ArrayBuffer]"?b.input=new Uint8Array(m):b.input=m,b.next_in=0,b.avail_in=b.input.length;do{if(b.avail_out===0&&(b.output=new i.Buf8(S),b.next_out=0,b.avail_out=S),(_=n.deflate(b,v))!==1&&_!==c)return this.onEnd(_),!(this.ended=!0);b.avail_out!==0&&(b.avail_in!==0||v!==4&&v!==2)||(this.options.to==="string"?this.onData(s.buf2binstring(i.shrinkBuf(b.output,b.next_out))):this.onData(i.shrinkBuf(b.output,b.next_out)))}while((0<b.avail_in||b.avail_out===0)&&_!==1);return v===4?(_=n.deflateEnd(this.strm),this.onEnd(_),this.ended=!0,_===c):v!==2||(this.onEnd(c),!(b.avail_out=0))},f.prototype.onData=function(m){this.chunks.push(m)},f.prototype.onEnd=function(m){m===c&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=m,this.msg=this.strm.msg},t.Deflate=f,t.deflate=p,t.deflateRaw=function(m,g){return(g=g||{}).raw=!0,p(m,g)},t.gzip=function(m,g){return(g=g||{}).gzip=!0,p(m,g)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(l,e,t){"use strict";var n=l("./zlib/inflate"),i=l("./utils/common"),s=l("./utils/strings"),r=l("./zlib/constants"),a=l("./zlib/messages"),o=l("./zlib/zstream"),c=l("./zlib/gzheader"),h=Object.prototype.toString;function u(f){if(!(this instanceof u))return new u(f);this.options=i.assign({chunkSize:16384,windowBits:0,to:""},f||{});var p=this.options;p.raw&&0<=p.windowBits&&p.windowBits<16&&(p.windowBits=-p.windowBits,p.windowBits===0&&(p.windowBits=-15)),!(0<=p.windowBits&&p.windowBits<16)||f&&f.windowBits||(p.windowBits+=32),15<p.windowBits&&p.windowBits<48&&(15&p.windowBits)==0&&(p.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new o,this.strm.avail_out=0;var m=n.inflateInit2(this.strm,p.windowBits);if(m!==r.Z_OK)throw new Error(a[m]);this.header=new c,n.inflateGetHeader(this.strm,this.header)}function d(f,p){var m=new u(p);if(m.push(f,!0),m.err)throw m.msg||a[m.err];return m.result}u.prototype.push=function(f,p){var m,g,_,v,b,S,w=this.strm,T=this.options.chunkSize,E=this.options.dictionary,I=!1;if(this.ended)return!1;g=p===~~p?p:p===!0?r.Z_FINISH:r.Z_NO_FLUSH,typeof f=="string"?w.input=s.binstring2buf(f):h.call(f)==="[object ArrayBuffer]"?w.input=new Uint8Array(f):w.input=f,w.next_in=0,w.avail_in=w.input.length;do{if(w.avail_out===0&&(w.output=new i.Buf8(T),w.next_out=0,w.avail_out=T),(m=n.inflate(w,r.Z_NO_FLUSH))===r.Z_NEED_DICT&&E&&(S=typeof E=="string"?s.string2buf(E):h.call(E)==="[object ArrayBuffer]"?new Uint8Array(E):E,m=n.inflateSetDictionary(this.strm,S)),m===r.Z_BUF_ERROR&&I===!0&&(m=r.Z_OK,I=!1),m!==r.Z_STREAM_END&&m!==r.Z_OK)return this.onEnd(m),!(this.ended=!0);w.next_out&&(w.avail_out!==0&&m!==r.Z_STREAM_END&&(w.avail_in!==0||g!==r.Z_FINISH&&g!==r.Z_SYNC_FLUSH)||(this.options.to==="string"?(_=s.utf8border(w.output,w.next_out),v=w.next_out-_,b=s.buf2string(w.output,_),w.next_out=v,w.avail_out=T-v,v&&i.arraySet(w.output,w.output,_,v,0),this.onData(b)):this.onData(i.shrinkBuf(w.output,w.next_out)))),w.avail_in===0&&w.avail_out===0&&(I=!0)}while((0<w.avail_in||w.avail_out===0)&&m!==r.Z_STREAM_END);return m===r.Z_STREAM_END&&(g=r.Z_FINISH),g===r.Z_FINISH?(m=n.inflateEnd(this.strm),this.onEnd(m),this.ended=!0,m===r.Z_OK):g!==r.Z_SYNC_FLUSH||(this.onEnd(r.Z_OK),!(w.avail_out=0))},u.prototype.onData=function(f){this.chunks.push(f)},u.prototype.onEnd=function(f){f===r.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=f,this.msg=this.strm.msg},t.Inflate=u,t.inflate=d,t.inflateRaw=function(f,p){return(p=p||{}).raw=!0,d(f,p)},t.ungzip=d},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(l,e,t){"use strict";var n=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";t.assign=function(r){for(var a=Array.prototype.slice.call(arguments,1);a.length;){var o=a.shift();if(o){if(typeof o!="object")throw new TypeError(o+"must be non-object");for(var c in o)o.hasOwnProperty(c)&&(r[c]=o[c])}}return r},t.shrinkBuf=function(r,a){return r.length===a?r:r.subarray?r.subarray(0,a):(r.length=a,r)};var i={arraySet:function(r,a,o,c,h){if(a.subarray&&r.subarray)r.set(a.subarray(o,o+c),h);else for(var u=0;u<c;u++)r[h+u]=a[o+u]},flattenChunks:function(r){var a,o,c,h,u,d;for(a=c=0,o=r.length;a<o;a++)c+=r[a].length;for(d=new Uint8Array(c),a=h=0,o=r.length;a<o;a++)u=r[a],d.set(u,h),h+=u.length;return d}},s={arraySet:function(r,a,o,c,h){for(var u=0;u<c;u++)r[h+u]=a[o+u]},flattenChunks:function(r){return[].concat.apply([],r)}};t.setTyped=function(r){r?(t.Buf8=Uint8Array,t.Buf16=Uint16Array,t.Buf32=Int32Array,t.assign(t,i)):(t.Buf8=Array,t.Buf16=Array,t.Buf32=Array,t.assign(t,s))},t.setTyped(n)},{}],42:[function(l,e,t){"use strict";var n=l("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch{i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{s=!1}for(var r=new n.Buf8(256),a=0;a<256;a++)r[a]=252<=a?6:248<=a?5:240<=a?4:224<=a?3:192<=a?2:1;function o(c,h){if(h<65537&&(c.subarray&&s||!c.subarray&&i))return String.fromCharCode.apply(null,n.shrinkBuf(c,h));for(var u="",d=0;d<h;d++)u+=String.fromCharCode(c[d]);return u}r[254]=r[254]=1,t.string2buf=function(c){var h,u,d,f,p,m=c.length,g=0;for(f=0;f<m;f++)(64512&(u=c.charCodeAt(f)))==55296&&f+1<m&&(64512&(d=c.charCodeAt(f+1)))==56320&&(u=65536+(u-55296<<10)+(d-56320),f++),g+=u<128?1:u<2048?2:u<65536?3:4;for(h=new n.Buf8(g),f=p=0;p<g;f++)(64512&(u=c.charCodeAt(f)))==55296&&f+1<m&&(64512&(d=c.charCodeAt(f+1)))==56320&&(u=65536+(u-55296<<10)+(d-56320),f++),u<128?h[p++]=u:(u<2048?h[p++]=192|u>>>6:(u<65536?h[p++]=224|u>>>12:(h[p++]=240|u>>>18,h[p++]=128|u>>>12&63),h[p++]=128|u>>>6&63),h[p++]=128|63&u);return h},t.buf2binstring=function(c){return o(c,c.length)},t.binstring2buf=function(c){for(var h=new n.Buf8(c.length),u=0,d=h.length;u<d;u++)h[u]=c.charCodeAt(u);return h},t.buf2string=function(c,h){var u,d,f,p,m=h||c.length,g=new Array(2*m);for(u=d=0;u<m;)if((f=c[u++])<128)g[d++]=f;else if(4<(p=r[f]))g[d++]=65533,u+=p-1;else{for(f&=p===2?31:p===3?15:7;1<p&&u<m;)f=f<<6|63&c[u++],p--;1<p?g[d++]=65533:f<65536?g[d++]=f:(f-=65536,g[d++]=55296|f>>10&1023,g[d++]=56320|1023&f)}return o(g,d)},t.utf8border=function(c,h){var u;for((h=h||c.length)>c.length&&(h=c.length),u=h-1;0<=u&&(192&c[u])==128;)u--;return u<0||u===0?h:u+r[c[u]]>h?u:h}},{"./common":41}],43:[function(l,e,t){"use strict";e.exports=function(n,i,s,r){for(var a=65535&n|0,o=n>>>16&65535|0,c=0;s!==0;){for(s-=c=2e3<s?2e3:s;o=o+(a=a+i[r++]|0)|0,--c;);a%=65521,o%=65521}return a|o<<16|0}},{}],44:[function(l,e,t){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(l,e,t){"use strict";var n=(function(){for(var i,s=[],r=0;r<256;r++){i=r;for(var a=0;a<8;a++)i=1&i?3988292384^i>>>1:i>>>1;s[r]=i}return s})();e.exports=function(i,s,r,a){var o=n,c=a+r;i^=-1;for(var h=a;h<c;h++)i=i>>>8^o[255&(i^s[h])];return-1^i}},{}],46:[function(l,e,t){"use strict";var n,i=l("../utils/common"),s=l("./trees"),r=l("./adler32"),a=l("./crc32"),o=l("./messages"),c=0,h=4,u=0,d=-2,f=-1,p=4,m=2,g=8,_=9,v=286,b=30,S=19,w=2*v+1,T=15,E=3,I=258,L=I+E+1,M=42,C=113,y=1,F=2,j=3,O=4;function G(x,V){return x.msg=o[V],V}function k(x){return(x<<1)-(4<x?9:0)}function Y(x){for(var V=x.length;0<=--V;)x[V]=0}function P(x){var V=x.state,z=V.pending;z>x.avail_out&&(z=x.avail_out),z!==0&&(i.arraySet(x.output,V.pending_buf,V.pending_out,z,x.next_out),x.next_out+=z,V.pending_out+=z,x.total_out+=z,x.avail_out-=z,V.pending-=z,V.pending===0&&(V.pending_out=0))}function N(x,V){s._tr_flush_block(x,0<=x.block_start?x.block_start:-1,x.strstart-x.block_start,V),x.block_start=x.strstart,P(x.strm)}function K(x,V){x.pending_buf[x.pending++]=V}function X(x,V){x.pending_buf[x.pending++]=V>>>8&255,x.pending_buf[x.pending++]=255&V}function H(x,V){var z,R,A=x.max_chain_length,D=x.strstart,W=x.prev_length,q=x.nice_match,B=x.strstart>x.w_size-L?x.strstart-(x.w_size-L):0,J=x.window,ie=x.w_mask,$=x.prev,re=x.strstart+I,be=J[D+W-1],ge=J[D+W];x.prev_length>=x.good_match&&(A>>=2),q>x.lookahead&&(q=x.lookahead);do if(J[(z=V)+W]===ge&&J[z+W-1]===be&&J[z]===J[D]&&J[++z]===J[D+1]){D+=2,z++;do;while(J[++D]===J[++z]&&J[++D]===J[++z]&&J[++D]===J[++z]&&J[++D]===J[++z]&&J[++D]===J[++z]&&J[++D]===J[++z]&&J[++D]===J[++z]&&J[++D]===J[++z]&&D<re);if(R=I-(re-D),D=re-I,W<R){if(x.match_start=V,q<=(W=R))break;be=J[D+W-1],ge=J[D+W]}}while((V=$[V&ie])>B&&--A!=0);return W<=x.lookahead?W:x.lookahead}function te(x){var V,z,R,A,D,W,q,B,J,ie,$=x.w_size;do{if(A=x.window_size-x.lookahead-x.strstart,x.strstart>=$+($-L)){for(i.arraySet(x.window,x.window,$,$,0),x.match_start-=$,x.strstart-=$,x.block_start-=$,V=z=x.hash_size;R=x.head[--V],x.head[V]=$<=R?R-$:0,--z;);for(V=z=$;R=x.prev[--V],x.prev[V]=$<=R?R-$:0,--z;);A+=$}if(x.strm.avail_in===0)break;if(W=x.strm,q=x.window,B=x.strstart+x.lookahead,J=A,ie=void 0,ie=W.avail_in,J<ie&&(ie=J),z=ie===0?0:(W.avail_in-=ie,i.arraySet(q,W.input,W.next_in,ie,B),W.state.wrap===1?W.adler=r(W.adler,q,ie,B):W.state.wrap===2&&(W.adler=a(W.adler,q,ie,B)),W.next_in+=ie,W.total_in+=ie,ie),x.lookahead+=z,x.lookahead+x.insert>=E)for(D=x.strstart-x.insert,x.ins_h=x.window[D],x.ins_h=(x.ins_h<<x.hash_shift^x.window[D+1])&x.hash_mask;x.insert&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[D+E-1])&x.hash_mask,x.prev[D&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=D,D++,x.insert--,!(x.lookahead+x.insert<E)););}while(x.lookahead<L&&x.strm.avail_in!==0)}function ee(x,V){for(var z,R;;){if(x.lookahead<L){if(te(x),x.lookahead<L&&V===c)return y;if(x.lookahead===0)break}if(z=0,x.lookahead>=E&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+E-1])&x.hash_mask,z=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),z!==0&&x.strstart-z<=x.w_size-L&&(x.match_length=H(x,z)),x.match_length>=E)if(R=s._tr_tally(x,x.strstart-x.match_start,x.match_length-E),x.lookahead-=x.match_length,x.match_length<=x.max_lazy_match&&x.lookahead>=E){for(x.match_length--;x.strstart++,x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+E-1])&x.hash_mask,z=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart,--x.match_length!=0;);x.strstart++}else x.strstart+=x.match_length,x.match_length=0,x.ins_h=x.window[x.strstart],x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+1])&x.hash_mask;else R=s._tr_tally(x,0,x.window[x.strstart]),x.lookahead--,x.strstart++;if(R&&(N(x,!1),x.strm.avail_out===0))return y}return x.insert=x.strstart<E-1?x.strstart:E-1,V===h?(N(x,!0),x.strm.avail_out===0?j:O):x.last_lit&&(N(x,!1),x.strm.avail_out===0)?y:F}function Z(x,V){for(var z,R,A;;){if(x.lookahead<L){if(te(x),x.lookahead<L&&V===c)return y;if(x.lookahead===0)break}if(z=0,x.lookahead>=E&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+E-1])&x.hash_mask,z=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),x.prev_length=x.match_length,x.prev_match=x.match_start,x.match_length=E-1,z!==0&&x.prev_length<x.max_lazy_match&&x.strstart-z<=x.w_size-L&&(x.match_length=H(x,z),x.match_length<=5&&(x.strategy===1||x.match_length===E&&4096<x.strstart-x.match_start)&&(x.match_length=E-1)),x.prev_length>=E&&x.match_length<=x.prev_length){for(A=x.strstart+x.lookahead-E,R=s._tr_tally(x,x.strstart-1-x.prev_match,x.prev_length-E),x.lookahead-=x.prev_length-1,x.prev_length-=2;++x.strstart<=A&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+E-1])&x.hash_mask,z=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),--x.prev_length!=0;);if(x.match_available=0,x.match_length=E-1,x.strstart++,R&&(N(x,!1),x.strm.avail_out===0))return y}else if(x.match_available){if((R=s._tr_tally(x,0,x.window[x.strstart-1]))&&N(x,!1),x.strstart++,x.lookahead--,x.strm.avail_out===0)return y}else x.match_available=1,x.strstart++,x.lookahead--}return x.match_available&&(R=s._tr_tally(x,0,x.window[x.strstart-1]),x.match_available=0),x.insert=x.strstart<E-1?x.strstart:E-1,V===h?(N(x,!0),x.strm.avail_out===0?j:O):x.last_lit&&(N(x,!1),x.strm.avail_out===0)?y:F}function Q(x,V,z,R,A){this.good_length=x,this.max_lazy=V,this.nice_length=z,this.max_chain=R,this.func=A}function oe(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=g,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new i.Buf16(2*w),this.dyn_dtree=new i.Buf16(2*(2*b+1)),this.bl_tree=new i.Buf16(2*(2*S+1)),Y(this.dyn_ltree),Y(this.dyn_dtree),Y(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new i.Buf16(T+1),this.heap=new i.Buf16(2*v+1),Y(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new i.Buf16(2*v+1),Y(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function he(x){var V;return x&&x.state?(x.total_in=x.total_out=0,x.data_type=m,(V=x.state).pending=0,V.pending_out=0,V.wrap<0&&(V.wrap=-V.wrap),V.status=V.wrap?M:C,x.adler=V.wrap===2?0:1,V.last_flush=c,s._tr_init(V),u):G(x,d)}function Se(x){var V=he(x);return V===u&&(function(z){z.window_size=2*z.w_size,Y(z.head),z.max_lazy_match=n[z.level].max_lazy,z.good_match=n[z.level].good_length,z.nice_match=n[z.level].nice_length,z.max_chain_length=n[z.level].max_chain,z.strstart=0,z.block_start=0,z.lookahead=0,z.insert=0,z.match_length=z.prev_length=E-1,z.match_available=0,z.ins_h=0})(x.state),V}function Pe(x,V,z,R,A,D){if(!x)return d;var W=1;if(V===f&&(V=6),R<0?(W=0,R=-R):15<R&&(W=2,R-=16),A<1||_<A||z!==g||R<8||15<R||V<0||9<V||D<0||p<D)return G(x,d);R===8&&(R=9);var q=new oe;return(x.state=q).strm=x,q.wrap=W,q.gzhead=null,q.w_bits=R,q.w_size=1<<q.w_bits,q.w_mask=q.w_size-1,q.hash_bits=A+7,q.hash_size=1<<q.hash_bits,q.hash_mask=q.hash_size-1,q.hash_shift=~~((q.hash_bits+E-1)/E),q.window=new i.Buf8(2*q.w_size),q.head=new i.Buf16(q.hash_size),q.prev=new i.Buf16(q.w_size),q.lit_bufsize=1<<A+6,q.pending_buf_size=4*q.lit_bufsize,q.pending_buf=new i.Buf8(q.pending_buf_size),q.d_buf=1*q.lit_bufsize,q.l_buf=3*q.lit_bufsize,q.level=V,q.strategy=D,q.method=z,Se(x)}n=[new Q(0,0,0,0,function(x,V){var z=65535;for(z>x.pending_buf_size-5&&(z=x.pending_buf_size-5);;){if(x.lookahead<=1){if(te(x),x.lookahead===0&&V===c)return y;if(x.lookahead===0)break}x.strstart+=x.lookahead,x.lookahead=0;var R=x.block_start+z;if((x.strstart===0||x.strstart>=R)&&(x.lookahead=x.strstart-R,x.strstart=R,N(x,!1),x.strm.avail_out===0)||x.strstart-x.block_start>=x.w_size-L&&(N(x,!1),x.strm.avail_out===0))return y}return x.insert=0,V===h?(N(x,!0),x.strm.avail_out===0?j:O):(x.strstart>x.block_start&&(N(x,!1),x.strm.avail_out),y)}),new Q(4,4,8,4,ee),new Q(4,5,16,8,ee),new Q(4,6,32,32,ee),new Q(4,4,16,16,Z),new Q(8,16,32,32,Z),new Q(8,16,128,128,Z),new Q(8,32,128,256,Z),new Q(32,128,258,1024,Z),new Q(32,258,258,4096,Z)],t.deflateInit=function(x,V){return Pe(x,V,g,15,8,0)},t.deflateInit2=Pe,t.deflateReset=Se,t.deflateResetKeep=he,t.deflateSetHeader=function(x,V){return x&&x.state?x.state.wrap!==2?d:(x.state.gzhead=V,u):d},t.deflate=function(x,V){var z,R,A,D;if(!x||!x.state||5<V||V<0)return x?G(x,d):d;if(R=x.state,!x.output||!x.input&&x.avail_in!==0||R.status===666&&V!==h)return G(x,x.avail_out===0?-5:d);if(R.strm=x,z=R.last_flush,R.last_flush=V,R.status===M)if(R.wrap===2)x.adler=0,K(R,31),K(R,139),K(R,8),R.gzhead?(K(R,(R.gzhead.text?1:0)+(R.gzhead.hcrc?2:0)+(R.gzhead.extra?4:0)+(R.gzhead.name?8:0)+(R.gzhead.comment?16:0)),K(R,255&R.gzhead.time),K(R,R.gzhead.time>>8&255),K(R,R.gzhead.time>>16&255),K(R,R.gzhead.time>>24&255),K(R,R.level===9?2:2<=R.strategy||R.level<2?4:0),K(R,255&R.gzhead.os),R.gzhead.extra&&R.gzhead.extra.length&&(K(R,255&R.gzhead.extra.length),K(R,R.gzhead.extra.length>>8&255)),R.gzhead.hcrc&&(x.adler=a(x.adler,R.pending_buf,R.pending,0)),R.gzindex=0,R.status=69):(K(R,0),K(R,0),K(R,0),K(R,0),K(R,0),K(R,R.level===9?2:2<=R.strategy||R.level<2?4:0),K(R,3),R.status=C);else{var W=g+(R.w_bits-8<<4)<<8;W|=(2<=R.strategy||R.level<2?0:R.level<6?1:R.level===6?2:3)<<6,R.strstart!==0&&(W|=32),W+=31-W%31,R.status=C,X(R,W),R.strstart!==0&&(X(R,x.adler>>>16),X(R,65535&x.adler)),x.adler=1}if(R.status===69)if(R.gzhead.extra){for(A=R.pending;R.gzindex<(65535&R.gzhead.extra.length)&&(R.pending!==R.pending_buf_size||(R.gzhead.hcrc&&R.pending>A&&(x.adler=a(x.adler,R.pending_buf,R.pending-A,A)),P(x),A=R.pending,R.pending!==R.pending_buf_size));)K(R,255&R.gzhead.extra[R.gzindex]),R.gzindex++;R.gzhead.hcrc&&R.pending>A&&(x.adler=a(x.adler,R.pending_buf,R.pending-A,A)),R.gzindex===R.gzhead.extra.length&&(R.gzindex=0,R.status=73)}else R.status=73;if(R.status===73)if(R.gzhead.name){A=R.pending;do{if(R.pending===R.pending_buf_size&&(R.gzhead.hcrc&&R.pending>A&&(x.adler=a(x.adler,R.pending_buf,R.pending-A,A)),P(x),A=R.pending,R.pending===R.pending_buf_size)){D=1;break}D=R.gzindex<R.gzhead.name.length?255&R.gzhead.name.charCodeAt(R.gzindex++):0,K(R,D)}while(D!==0);R.gzhead.hcrc&&R.pending>A&&(x.adler=a(x.adler,R.pending_buf,R.pending-A,A)),D===0&&(R.gzindex=0,R.status=91)}else R.status=91;if(R.status===91)if(R.gzhead.comment){A=R.pending;do{if(R.pending===R.pending_buf_size&&(R.gzhead.hcrc&&R.pending>A&&(x.adler=a(x.adler,R.pending_buf,R.pending-A,A)),P(x),A=R.pending,R.pending===R.pending_buf_size)){D=1;break}D=R.gzindex<R.gzhead.comment.length?255&R.gzhead.comment.charCodeAt(R.gzindex++):0,K(R,D)}while(D!==0);R.gzhead.hcrc&&R.pending>A&&(x.adler=a(x.adler,R.pending_buf,R.pending-A,A)),D===0&&(R.status=103)}else R.status=103;if(R.status===103&&(R.gzhead.hcrc?(R.pending+2>R.pending_buf_size&&P(x),R.pending+2<=R.pending_buf_size&&(K(R,255&x.adler),K(R,x.adler>>8&255),x.adler=0,R.status=C)):R.status=C),R.pending!==0){if(P(x),x.avail_out===0)return R.last_flush=-1,u}else if(x.avail_in===0&&k(V)<=k(z)&&V!==h)return G(x,-5);if(R.status===666&&x.avail_in!==0)return G(x,-5);if(x.avail_in!==0||R.lookahead!==0||V!==c&&R.status!==666){var q=R.strategy===2?(function(B,J){for(var ie;;){if(B.lookahead===0&&(te(B),B.lookahead===0)){if(J===c)return y;break}if(B.match_length=0,ie=s._tr_tally(B,0,B.window[B.strstart]),B.lookahead--,B.strstart++,ie&&(N(B,!1),B.strm.avail_out===0))return y}return B.insert=0,J===h?(N(B,!0),B.strm.avail_out===0?j:O):B.last_lit&&(N(B,!1),B.strm.avail_out===0)?y:F})(R,V):R.strategy===3?(function(B,J){for(var ie,$,re,be,ge=B.window;;){if(B.lookahead<=I){if(te(B),B.lookahead<=I&&J===c)return y;if(B.lookahead===0)break}if(B.match_length=0,B.lookahead>=E&&0<B.strstart&&($=ge[re=B.strstart-1])===ge[++re]&&$===ge[++re]&&$===ge[++re]){be=B.strstart+I;do;while($===ge[++re]&&$===ge[++re]&&$===ge[++re]&&$===ge[++re]&&$===ge[++re]&&$===ge[++re]&&$===ge[++re]&&$===ge[++re]&&re<be);B.match_length=I-(be-re),B.match_length>B.lookahead&&(B.match_length=B.lookahead)}if(B.match_length>=E?(ie=s._tr_tally(B,1,B.match_length-E),B.lookahead-=B.match_length,B.strstart+=B.match_length,B.match_length=0):(ie=s._tr_tally(B,0,B.window[B.strstart]),B.lookahead--,B.strstart++),ie&&(N(B,!1),B.strm.avail_out===0))return y}return B.insert=0,J===h?(N(B,!0),B.strm.avail_out===0?j:O):B.last_lit&&(N(B,!1),B.strm.avail_out===0)?y:F})(R,V):n[R.level].func(R,V);if(q!==j&&q!==O||(R.status=666),q===y||q===j)return x.avail_out===0&&(R.last_flush=-1),u;if(q===F&&(V===1?s._tr_align(R):V!==5&&(s._tr_stored_block(R,0,0,!1),V===3&&(Y(R.head),R.lookahead===0&&(R.strstart=0,R.block_start=0,R.insert=0))),P(x),x.avail_out===0))return R.last_flush=-1,u}return V!==h?u:R.wrap<=0?1:(R.wrap===2?(K(R,255&x.adler),K(R,x.adler>>8&255),K(R,x.adler>>16&255),K(R,x.adler>>24&255),K(R,255&x.total_in),K(R,x.total_in>>8&255),K(R,x.total_in>>16&255),K(R,x.total_in>>24&255)):(X(R,x.adler>>>16),X(R,65535&x.adler)),P(x),0<R.wrap&&(R.wrap=-R.wrap),R.pending!==0?u:1)},t.deflateEnd=function(x){var V;return x&&x.state?(V=x.state.status)!==M&&V!==69&&V!==73&&V!==91&&V!==103&&V!==C&&V!==666?G(x,d):(x.state=null,V===C?G(x,-3):u):d},t.deflateSetDictionary=function(x,V){var z,R,A,D,W,q,B,J,ie=V.length;if(!x||!x.state||(D=(z=x.state).wrap)===2||D===1&&z.status!==M||z.lookahead)return d;for(D===1&&(x.adler=r(x.adler,V,ie,0)),z.wrap=0,ie>=z.w_size&&(D===0&&(Y(z.head),z.strstart=0,z.block_start=0,z.insert=0),J=new i.Buf8(z.w_size),i.arraySet(J,V,ie-z.w_size,z.w_size,0),V=J,ie=z.w_size),W=x.avail_in,q=x.next_in,B=x.input,x.avail_in=ie,x.next_in=0,x.input=V,te(z);z.lookahead>=E;){for(R=z.strstart,A=z.lookahead-(E-1);z.ins_h=(z.ins_h<<z.hash_shift^z.window[R+E-1])&z.hash_mask,z.prev[R&z.w_mask]=z.head[z.ins_h],z.head[z.ins_h]=R,R++,--A;);z.strstart=R,z.lookahead=E-1,te(z)}return z.strstart+=z.lookahead,z.block_start=z.strstart,z.insert=z.lookahead,z.lookahead=0,z.match_length=z.prev_length=E-1,z.match_available=0,x.next_in=q,x.input=B,x.avail_in=W,z.wrap=D,u},t.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(l,e,t){"use strict";e.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(l,e,t){"use strict";e.exports=function(n,i){var s,r,a,o,c,h,u,d,f,p,m,g,_,v,b,S,w,T,E,I,L,M,C,y,F;s=n.state,r=n.next_in,y=n.input,a=r+(n.avail_in-5),o=n.next_out,F=n.output,c=o-(i-n.avail_out),h=o+(n.avail_out-257),u=s.dmax,d=s.wsize,f=s.whave,p=s.wnext,m=s.window,g=s.hold,_=s.bits,v=s.lencode,b=s.distcode,S=(1<<s.lenbits)-1,w=(1<<s.distbits)-1;e:do{_<15&&(g+=y[r++]<<_,_+=8,g+=y[r++]<<_,_+=8),T=v[g&S];t:for(;;){if(g>>>=E=T>>>24,_-=E,(E=T>>>16&255)===0)F[o++]=65535&T;else{if(!(16&E)){if((64&E)==0){T=v[(65535&T)+(g&(1<<E)-1)];continue t}if(32&E){s.mode=12;break e}n.msg="invalid literal/length code",s.mode=30;break e}I=65535&T,(E&=15)&&(_<E&&(g+=y[r++]<<_,_+=8),I+=g&(1<<E)-1,g>>>=E,_-=E),_<15&&(g+=y[r++]<<_,_+=8,g+=y[r++]<<_,_+=8),T=b[g&w];n:for(;;){if(g>>>=E=T>>>24,_-=E,!(16&(E=T>>>16&255))){if((64&E)==0){T=b[(65535&T)+(g&(1<<E)-1)];continue n}n.msg="invalid distance code",s.mode=30;break e}if(L=65535&T,_<(E&=15)&&(g+=y[r++]<<_,(_+=8)<E&&(g+=y[r++]<<_,_+=8)),u<(L+=g&(1<<E)-1)){n.msg="invalid distance too far back",s.mode=30;break e}if(g>>>=E,_-=E,(E=o-c)<L){if(f<(E=L-E)&&s.sane){n.msg="invalid distance too far back",s.mode=30;break e}if(C=m,(M=0)===p){if(M+=d-E,E<I){for(I-=E;F[o++]=m[M++],--E;);M=o-L,C=F}}else if(p<E){if(M+=d+p-E,(E-=p)<I){for(I-=E;F[o++]=m[M++],--E;);if(M=0,p<I){for(I-=E=p;F[o++]=m[M++],--E;);M=o-L,C=F}}}else if(M+=p-E,E<I){for(I-=E;F[o++]=m[M++],--E;);M=o-L,C=F}for(;2<I;)F[o++]=C[M++],F[o++]=C[M++],F[o++]=C[M++],I-=3;I&&(F[o++]=C[M++],1<I&&(F[o++]=C[M++]))}else{for(M=o-L;F[o++]=F[M++],F[o++]=F[M++],F[o++]=F[M++],2<(I-=3););I&&(F[o++]=F[M++],1<I&&(F[o++]=F[M++]))}break}}break}}while(r<a&&o<h);r-=I=_>>3,g&=(1<<(_-=I<<3))-1,n.next_in=r,n.next_out=o,n.avail_in=r<a?a-r+5:5-(r-a),n.avail_out=o<h?h-o+257:257-(o-h),s.hold=g,s.bits=_}},{}],49:[function(l,e,t){"use strict";var n=l("../utils/common"),i=l("./adler32"),s=l("./crc32"),r=l("./inffast"),a=l("./inftrees"),o=1,c=2,h=0,u=-2,d=1,f=852,p=592;function m(M){return(M>>>24&255)+(M>>>8&65280)+((65280&M)<<8)+((255&M)<<24)}function g(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new n.Buf16(320),this.work=new n.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function _(M){var C;return M&&M.state?(C=M.state,M.total_in=M.total_out=C.total=0,M.msg="",C.wrap&&(M.adler=1&C.wrap),C.mode=d,C.last=0,C.havedict=0,C.dmax=32768,C.head=null,C.hold=0,C.bits=0,C.lencode=C.lendyn=new n.Buf32(f),C.distcode=C.distdyn=new n.Buf32(p),C.sane=1,C.back=-1,h):u}function v(M){var C;return M&&M.state?((C=M.state).wsize=0,C.whave=0,C.wnext=0,_(M)):u}function b(M,C){var y,F;return M&&M.state?(F=M.state,C<0?(y=0,C=-C):(y=1+(C>>4),C<48&&(C&=15)),C&&(C<8||15<C)?u:(F.window!==null&&F.wbits!==C&&(F.window=null),F.wrap=y,F.wbits=C,v(M))):u}function S(M,C){var y,F;return M?(F=new g,(M.state=F).window=null,(y=b(M,C))!==h&&(M.state=null),y):u}var w,T,E=!0;function I(M){if(E){var C;for(w=new n.Buf32(512),T=new n.Buf32(32),C=0;C<144;)M.lens[C++]=8;for(;C<256;)M.lens[C++]=9;for(;C<280;)M.lens[C++]=7;for(;C<288;)M.lens[C++]=8;for(a(o,M.lens,0,288,w,0,M.work,{bits:9}),C=0;C<32;)M.lens[C++]=5;a(c,M.lens,0,32,T,0,M.work,{bits:5}),E=!1}M.lencode=w,M.lenbits=9,M.distcode=T,M.distbits=5}function L(M,C,y,F){var j,O=M.state;return O.window===null&&(O.wsize=1<<O.wbits,O.wnext=0,O.whave=0,O.window=new n.Buf8(O.wsize)),F>=O.wsize?(n.arraySet(O.window,C,y-O.wsize,O.wsize,0),O.wnext=0,O.whave=O.wsize):(F<(j=O.wsize-O.wnext)&&(j=F),n.arraySet(O.window,C,y-F,j,O.wnext),(F-=j)?(n.arraySet(O.window,C,y-F,F,0),O.wnext=F,O.whave=O.wsize):(O.wnext+=j,O.wnext===O.wsize&&(O.wnext=0),O.whave<O.wsize&&(O.whave+=j))),0}t.inflateReset=v,t.inflateReset2=b,t.inflateResetKeep=_,t.inflateInit=function(M){return S(M,15)},t.inflateInit2=S,t.inflate=function(M,C){var y,F,j,O,G,k,Y,P,N,K,X,H,te,ee,Z,Q,oe,he,Se,Pe,x,V,z,R,A=0,D=new n.Buf8(4),W=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!M||!M.state||!M.output||!M.input&&M.avail_in!==0)return u;(y=M.state).mode===12&&(y.mode=13),G=M.next_out,j=M.output,Y=M.avail_out,O=M.next_in,F=M.input,k=M.avail_in,P=y.hold,N=y.bits,K=k,X=Y,V=h;e:for(;;)switch(y.mode){case d:if(y.wrap===0){y.mode=13;break}for(;N<16;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}if(2&y.wrap&&P===35615){D[y.check=0]=255&P,D[1]=P>>>8&255,y.check=s(y.check,D,2,0),N=P=0,y.mode=2;break}if(y.flags=0,y.head&&(y.head.done=!1),!(1&y.wrap)||(((255&P)<<8)+(P>>8))%31){M.msg="incorrect header check",y.mode=30;break}if((15&P)!=8){M.msg="unknown compression method",y.mode=30;break}if(N-=4,x=8+(15&(P>>>=4)),y.wbits===0)y.wbits=x;else if(x>y.wbits){M.msg="invalid window size",y.mode=30;break}y.dmax=1<<x,M.adler=y.check=1,y.mode=512&P?10:12,N=P=0;break;case 2:for(;N<16;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}if(y.flags=P,(255&y.flags)!=8){M.msg="unknown compression method",y.mode=30;break}if(57344&y.flags){M.msg="unknown header flags set",y.mode=30;break}y.head&&(y.head.text=P>>8&1),512&y.flags&&(D[0]=255&P,D[1]=P>>>8&255,y.check=s(y.check,D,2,0)),N=P=0,y.mode=3;case 3:for(;N<32;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}y.head&&(y.head.time=P),512&y.flags&&(D[0]=255&P,D[1]=P>>>8&255,D[2]=P>>>16&255,D[3]=P>>>24&255,y.check=s(y.check,D,4,0)),N=P=0,y.mode=4;case 4:for(;N<16;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}y.head&&(y.head.xflags=255&P,y.head.os=P>>8),512&y.flags&&(D[0]=255&P,D[1]=P>>>8&255,y.check=s(y.check,D,2,0)),N=P=0,y.mode=5;case 5:if(1024&y.flags){for(;N<16;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}y.length=P,y.head&&(y.head.extra_len=P),512&y.flags&&(D[0]=255&P,D[1]=P>>>8&255,y.check=s(y.check,D,2,0)),N=P=0}else y.head&&(y.head.extra=null);y.mode=6;case 6:if(1024&y.flags&&(k<(H=y.length)&&(H=k),H&&(y.head&&(x=y.head.extra_len-y.length,y.head.extra||(y.head.extra=new Array(y.head.extra_len)),n.arraySet(y.head.extra,F,O,H,x)),512&y.flags&&(y.check=s(y.check,F,H,O)),k-=H,O+=H,y.length-=H),y.length))break e;y.length=0,y.mode=7;case 7:if(2048&y.flags){if(k===0)break e;for(H=0;x=F[O+H++],y.head&&x&&y.length<65536&&(y.head.name+=String.fromCharCode(x)),x&&H<k;);if(512&y.flags&&(y.check=s(y.check,F,H,O)),k-=H,O+=H,x)break e}else y.head&&(y.head.name=null);y.length=0,y.mode=8;case 8:if(4096&y.flags){if(k===0)break e;for(H=0;x=F[O+H++],y.head&&x&&y.length<65536&&(y.head.comment+=String.fromCharCode(x)),x&&H<k;);if(512&y.flags&&(y.check=s(y.check,F,H,O)),k-=H,O+=H,x)break e}else y.head&&(y.head.comment=null);y.mode=9;case 9:if(512&y.flags){for(;N<16;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}if(P!==(65535&y.check)){M.msg="header crc mismatch",y.mode=30;break}N=P=0}y.head&&(y.head.hcrc=y.flags>>9&1,y.head.done=!0),M.adler=y.check=0,y.mode=12;break;case 10:for(;N<32;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}M.adler=y.check=m(P),N=P=0,y.mode=11;case 11:if(y.havedict===0)return M.next_out=G,M.avail_out=Y,M.next_in=O,M.avail_in=k,y.hold=P,y.bits=N,2;M.adler=y.check=1,y.mode=12;case 12:if(C===5||C===6)break e;case 13:if(y.last){P>>>=7&N,N-=7&N,y.mode=27;break}for(;N<3;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}switch(y.last=1&P,N-=1,3&(P>>>=1)){case 0:y.mode=14;break;case 1:if(I(y),y.mode=20,C!==6)break;P>>>=2,N-=2;break e;case 2:y.mode=17;break;case 3:M.msg="invalid block type",y.mode=30}P>>>=2,N-=2;break;case 14:for(P>>>=7&N,N-=7&N;N<32;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}if((65535&P)!=(P>>>16^65535)){M.msg="invalid stored block lengths",y.mode=30;break}if(y.length=65535&P,N=P=0,y.mode=15,C===6)break e;case 15:y.mode=16;case 16:if(H=y.length){if(k<H&&(H=k),Y<H&&(H=Y),H===0)break e;n.arraySet(j,F,O,H,G),k-=H,O+=H,Y-=H,G+=H,y.length-=H;break}y.mode=12;break;case 17:for(;N<14;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}if(y.nlen=257+(31&P),P>>>=5,N-=5,y.ndist=1+(31&P),P>>>=5,N-=5,y.ncode=4+(15&P),P>>>=4,N-=4,286<y.nlen||30<y.ndist){M.msg="too many length or distance symbols",y.mode=30;break}y.have=0,y.mode=18;case 18:for(;y.have<y.ncode;){for(;N<3;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}y.lens[W[y.have++]]=7&P,P>>>=3,N-=3}for(;y.have<19;)y.lens[W[y.have++]]=0;if(y.lencode=y.lendyn,y.lenbits=7,z={bits:y.lenbits},V=a(0,y.lens,0,19,y.lencode,0,y.work,z),y.lenbits=z.bits,V){M.msg="invalid code lengths set",y.mode=30;break}y.have=0,y.mode=19;case 19:for(;y.have<y.nlen+y.ndist;){for(;Q=(A=y.lencode[P&(1<<y.lenbits)-1])>>>16&255,oe=65535&A,!((Z=A>>>24)<=N);){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}if(oe<16)P>>>=Z,N-=Z,y.lens[y.have++]=oe;else{if(oe===16){for(R=Z+2;N<R;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}if(P>>>=Z,N-=Z,y.have===0){M.msg="invalid bit length repeat",y.mode=30;break}x=y.lens[y.have-1],H=3+(3&P),P>>>=2,N-=2}else if(oe===17){for(R=Z+3;N<R;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}N-=Z,x=0,H=3+(7&(P>>>=Z)),P>>>=3,N-=3}else{for(R=Z+7;N<R;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}N-=Z,x=0,H=11+(127&(P>>>=Z)),P>>>=7,N-=7}if(y.have+H>y.nlen+y.ndist){M.msg="invalid bit length repeat",y.mode=30;break}for(;H--;)y.lens[y.have++]=x}}if(y.mode===30)break;if(y.lens[256]===0){M.msg="invalid code -- missing end-of-block",y.mode=30;break}if(y.lenbits=9,z={bits:y.lenbits},V=a(o,y.lens,0,y.nlen,y.lencode,0,y.work,z),y.lenbits=z.bits,V){M.msg="invalid literal/lengths set",y.mode=30;break}if(y.distbits=6,y.distcode=y.distdyn,z={bits:y.distbits},V=a(c,y.lens,y.nlen,y.ndist,y.distcode,0,y.work,z),y.distbits=z.bits,V){M.msg="invalid distances set",y.mode=30;break}if(y.mode=20,C===6)break e;case 20:y.mode=21;case 21:if(6<=k&&258<=Y){M.next_out=G,M.avail_out=Y,M.next_in=O,M.avail_in=k,y.hold=P,y.bits=N,r(M,X),G=M.next_out,j=M.output,Y=M.avail_out,O=M.next_in,F=M.input,k=M.avail_in,P=y.hold,N=y.bits,y.mode===12&&(y.back=-1);break}for(y.back=0;Q=(A=y.lencode[P&(1<<y.lenbits)-1])>>>16&255,oe=65535&A,!((Z=A>>>24)<=N);){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}if(Q&&(240&Q)==0){for(he=Z,Se=Q,Pe=oe;Q=(A=y.lencode[Pe+((P&(1<<he+Se)-1)>>he)])>>>16&255,oe=65535&A,!(he+(Z=A>>>24)<=N);){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}P>>>=he,N-=he,y.back+=he}if(P>>>=Z,N-=Z,y.back+=Z,y.length=oe,Q===0){y.mode=26;break}if(32&Q){y.back=-1,y.mode=12;break}if(64&Q){M.msg="invalid literal/length code",y.mode=30;break}y.extra=15&Q,y.mode=22;case 22:if(y.extra){for(R=y.extra;N<R;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}y.length+=P&(1<<y.extra)-1,P>>>=y.extra,N-=y.extra,y.back+=y.extra}y.was=y.length,y.mode=23;case 23:for(;Q=(A=y.distcode[P&(1<<y.distbits)-1])>>>16&255,oe=65535&A,!((Z=A>>>24)<=N);){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}if((240&Q)==0){for(he=Z,Se=Q,Pe=oe;Q=(A=y.distcode[Pe+((P&(1<<he+Se)-1)>>he)])>>>16&255,oe=65535&A,!(he+(Z=A>>>24)<=N);){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}P>>>=he,N-=he,y.back+=he}if(P>>>=Z,N-=Z,y.back+=Z,64&Q){M.msg="invalid distance code",y.mode=30;break}y.offset=oe,y.extra=15&Q,y.mode=24;case 24:if(y.extra){for(R=y.extra;N<R;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}y.offset+=P&(1<<y.extra)-1,P>>>=y.extra,N-=y.extra,y.back+=y.extra}if(y.offset>y.dmax){M.msg="invalid distance too far back",y.mode=30;break}y.mode=25;case 25:if(Y===0)break e;if(H=X-Y,y.offset>H){if((H=y.offset-H)>y.whave&&y.sane){M.msg="invalid distance too far back",y.mode=30;break}te=H>y.wnext?(H-=y.wnext,y.wsize-H):y.wnext-H,H>y.length&&(H=y.length),ee=y.window}else ee=j,te=G-y.offset,H=y.length;for(Y<H&&(H=Y),Y-=H,y.length-=H;j[G++]=ee[te++],--H;);y.length===0&&(y.mode=21);break;case 26:if(Y===0)break e;j[G++]=y.length,Y--,y.mode=21;break;case 27:if(y.wrap){for(;N<32;){if(k===0)break e;k--,P|=F[O++]<<N,N+=8}if(X-=Y,M.total_out+=X,y.total+=X,X&&(M.adler=y.check=y.flags?s(y.check,j,X,G-X):i(y.check,j,X,G-X)),X=Y,(y.flags?P:m(P))!==y.check){M.msg="incorrect data check",y.mode=30;break}N=P=0}y.mode=28;case 28:if(y.wrap&&y.flags){for(;N<32;){if(k===0)break e;k--,P+=F[O++]<<N,N+=8}if(P!==(4294967295&y.total)){M.msg="incorrect length check",y.mode=30;break}N=P=0}y.mode=29;case 29:V=1;break e;case 30:V=-3;break e;case 31:return-4;default:return u}return M.next_out=G,M.avail_out=Y,M.next_in=O,M.avail_in=k,y.hold=P,y.bits=N,(y.wsize||X!==M.avail_out&&y.mode<30&&(y.mode<27||C!==4))&&L(M,M.output,M.next_out,X-M.avail_out)?(y.mode=31,-4):(K-=M.avail_in,X-=M.avail_out,M.total_in+=K,M.total_out+=X,y.total+=X,y.wrap&&X&&(M.adler=y.check=y.flags?s(y.check,j,X,M.next_out-X):i(y.check,j,X,M.next_out-X)),M.data_type=y.bits+(y.last?64:0)+(y.mode===12?128:0)+(y.mode===20||y.mode===15?256:0),(K==0&&X===0||C===4)&&V===h&&(V=-5),V)},t.inflateEnd=function(M){if(!M||!M.state)return u;var C=M.state;return C.window&&(C.window=null),M.state=null,h},t.inflateGetHeader=function(M,C){var y;return M&&M.state?(2&(y=M.state).wrap)==0?u:((y.head=C).done=!1,h):u},t.inflateSetDictionary=function(M,C){var y,F=C.length;return M&&M.state?(y=M.state).wrap!==0&&y.mode!==11?u:y.mode===11&&i(1,C,F,0)!==y.check?-3:L(M,C,F,F)?(y.mode=31,-4):(y.havedict=1,h):u},t.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(l,e,t){"use strict";var n=l("../utils/common"),i=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],s=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],r=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],a=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function(o,c,h,u,d,f,p,m){var g,_,v,b,S,w,T,E,I,L=m.bits,M=0,C=0,y=0,F=0,j=0,O=0,G=0,k=0,Y=0,P=0,N=null,K=0,X=new n.Buf16(16),H=new n.Buf16(16),te=null,ee=0;for(M=0;M<=15;M++)X[M]=0;for(C=0;C<u;C++)X[c[h+C]]++;for(j=L,F=15;1<=F&&X[F]===0;F--);if(F<j&&(j=F),F===0)return d[f++]=20971520,d[f++]=20971520,m.bits=1,0;for(y=1;y<F&&X[y]===0;y++);for(j<y&&(j=y),M=k=1;M<=15;M++)if(k<<=1,(k-=X[M])<0)return-1;if(0<k&&(o===0||F!==1))return-1;for(H[1]=0,M=1;M<15;M++)H[M+1]=H[M]+X[M];for(C=0;C<u;C++)c[h+C]!==0&&(p[H[c[h+C]]++]=C);if(w=o===0?(N=te=p,19):o===1?(N=i,K-=257,te=s,ee-=257,256):(N=r,te=a,-1),M=y,S=f,G=C=P=0,v=-1,b=(Y=1<<(O=j))-1,o===1&&852<Y||o===2&&592<Y)return 1;for(;;){for(T=M-G,I=p[C]<w?(E=0,p[C]):p[C]>w?(E=te[ee+p[C]],N[K+p[C]]):(E=96,0),g=1<<M-G,y=_=1<<O;d[S+(P>>G)+(_-=g)]=T<<24|E<<16|I|0,_!==0;);for(g=1<<M-1;P&g;)g>>=1;if(g!==0?(P&=g-1,P+=g):P=0,C++,--X[M]==0){if(M===F)break;M=c[h+p[C]]}if(j<M&&(P&b)!==v){for(G===0&&(G=j),S+=y,k=1<<(O=M-G);O+G<F&&!((k-=X[O+G])<=0);)O++,k<<=1;if(Y+=1<<O,o===1&&852<Y||o===2&&592<Y)return 1;d[v=P&b]=j<<24|O<<16|S-f|0}}return P!==0&&(d[S+P]=M-G<<24|64<<16|0),m.bits=j,0}},{"../utils/common":41}],51:[function(l,e,t){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(l,e,t){"use strict";var n=l("../utils/common"),i=0,s=1;function r(A){for(var D=A.length;0<=--D;)A[D]=0}var a=0,o=29,c=256,h=c+1+o,u=30,d=19,f=2*h+1,p=15,m=16,g=7,_=256,v=16,b=17,S=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],T=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],E=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],I=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],L=new Array(2*(h+2));r(L);var M=new Array(2*u);r(M);var C=new Array(512);r(C);var y=new Array(256);r(y);var F=new Array(o);r(F);var j,O,G,k=new Array(u);function Y(A,D,W,q,B){this.static_tree=A,this.extra_bits=D,this.extra_base=W,this.elems=q,this.max_length=B,this.has_stree=A&&A.length}function P(A,D){this.dyn_tree=A,this.max_code=0,this.stat_desc=D}function N(A){return A<256?C[A]:C[256+(A>>>7)]}function K(A,D){A.pending_buf[A.pending++]=255&D,A.pending_buf[A.pending++]=D>>>8&255}function X(A,D,W){A.bi_valid>m-W?(A.bi_buf|=D<<A.bi_valid&65535,K(A,A.bi_buf),A.bi_buf=D>>m-A.bi_valid,A.bi_valid+=W-m):(A.bi_buf|=D<<A.bi_valid&65535,A.bi_valid+=W)}function H(A,D,W){X(A,W[2*D],W[2*D+1])}function te(A,D){for(var W=0;W|=1&A,A>>>=1,W<<=1,0<--D;);return W>>>1}function ee(A,D,W){var q,B,J=new Array(p+1),ie=0;for(q=1;q<=p;q++)J[q]=ie=ie+W[q-1]<<1;for(B=0;B<=D;B++){var $=A[2*B+1];$!==0&&(A[2*B]=te(J[$]++,$))}}function Z(A){var D;for(D=0;D<h;D++)A.dyn_ltree[2*D]=0;for(D=0;D<u;D++)A.dyn_dtree[2*D]=0;for(D=0;D<d;D++)A.bl_tree[2*D]=0;A.dyn_ltree[2*_]=1,A.opt_len=A.static_len=0,A.last_lit=A.matches=0}function Q(A){8<A.bi_valid?K(A,A.bi_buf):0<A.bi_valid&&(A.pending_buf[A.pending++]=A.bi_buf),A.bi_buf=0,A.bi_valid=0}function oe(A,D,W,q){var B=2*D,J=2*W;return A[B]<A[J]||A[B]===A[J]&&q[D]<=q[W]}function he(A,D,W){for(var q=A.heap[W],B=W<<1;B<=A.heap_len&&(B<A.heap_len&&oe(D,A.heap[B+1],A.heap[B],A.depth)&&B++,!oe(D,q,A.heap[B],A.depth));)A.heap[W]=A.heap[B],W=B,B<<=1;A.heap[W]=q}function Se(A,D,W){var q,B,J,ie,$=0;if(A.last_lit!==0)for(;q=A.pending_buf[A.d_buf+2*$]<<8|A.pending_buf[A.d_buf+2*$+1],B=A.pending_buf[A.l_buf+$],$++,q===0?H(A,B,D):(H(A,(J=y[B])+c+1,D),(ie=w[J])!==0&&X(A,B-=F[J],ie),H(A,J=N(--q),W),(ie=T[J])!==0&&X(A,q-=k[J],ie)),$<A.last_lit;);H(A,_,D)}function Pe(A,D){var W,q,B,J=D.dyn_tree,ie=D.stat_desc.static_tree,$=D.stat_desc.has_stree,re=D.stat_desc.elems,be=-1;for(A.heap_len=0,A.heap_max=f,W=0;W<re;W++)J[2*W]!==0?(A.heap[++A.heap_len]=be=W,A.depth[W]=0):J[2*W+1]=0;for(;A.heap_len<2;)J[2*(B=A.heap[++A.heap_len]=be<2?++be:0)]=1,A.depth[B]=0,A.opt_len--,$&&(A.static_len-=ie[2*B+1]);for(D.max_code=be,W=A.heap_len>>1;1<=W;W--)he(A,J,W);for(B=re;W=A.heap[1],A.heap[1]=A.heap[A.heap_len--],he(A,J,1),q=A.heap[1],A.heap[--A.heap_max]=W,A.heap[--A.heap_max]=q,J[2*B]=J[2*W]+J[2*q],A.depth[B]=(A.depth[W]>=A.depth[q]?A.depth[W]:A.depth[q])+1,J[2*W+1]=J[2*q+1]=B,A.heap[1]=B++,he(A,J,1),2<=A.heap_len;);A.heap[--A.heap_max]=A.heap[1],(function(ge,ct){var ii,St,si,Ce,Wi,js,Ut=ct.dyn_tree,io=ct.max_code,Kc=ct.stat_desc.static_tree,jc=ct.stat_desc.has_stree,Jc=ct.stat_desc.extra_bits,so=ct.stat_desc.extra_base,ri=ct.stat_desc.max_length,Xi=0;for(Ce=0;Ce<=p;Ce++)ge.bl_count[Ce]=0;for(Ut[2*ge.heap[ge.heap_max]+1]=0,ii=ge.heap_max+1;ii<f;ii++)ri<(Ce=Ut[2*Ut[2*(St=ge.heap[ii])+1]+1]+1)&&(Ce=ri,Xi++),Ut[2*St+1]=Ce,io<St||(ge.bl_count[Ce]++,Wi=0,so<=St&&(Wi=Jc[St-so]),js=Ut[2*St],ge.opt_len+=js*(Ce+Wi),jc&&(ge.static_len+=js*(Kc[2*St+1]+Wi)));if(Xi!==0){do{for(Ce=ri-1;ge.bl_count[Ce]===0;)Ce--;ge.bl_count[Ce]--,ge.bl_count[Ce+1]+=2,ge.bl_count[ri]--,Xi-=2}while(0<Xi);for(Ce=ri;Ce!==0;Ce--)for(St=ge.bl_count[Ce];St!==0;)io<(si=ge.heap[--ii])||(Ut[2*si+1]!==Ce&&(ge.opt_len+=(Ce-Ut[2*si+1])*Ut[2*si],Ut[2*si+1]=Ce),St--)}})(A,D),ee(J,be,A.bl_count)}function x(A,D,W){var q,B,J=-1,ie=D[1],$=0,re=7,be=4;for(ie===0&&(re=138,be=3),D[2*(W+1)+1]=65535,q=0;q<=W;q++)B=ie,ie=D[2*(q+1)+1],++$<re&&B===ie||($<be?A.bl_tree[2*B]+=$:B!==0?(B!==J&&A.bl_tree[2*B]++,A.bl_tree[2*v]++):$<=10?A.bl_tree[2*b]++:A.bl_tree[2*S]++,J=B,be=($=0)===ie?(re=138,3):B===ie?(re=6,3):(re=7,4))}function V(A,D,W){var q,B,J=-1,ie=D[1],$=0,re=7,be=4;for(ie===0&&(re=138,be=3),q=0;q<=W;q++)if(B=ie,ie=D[2*(q+1)+1],!(++$<re&&B===ie)){if($<be)for(;H(A,B,A.bl_tree),--$!=0;);else B!==0?(B!==J&&(H(A,B,A.bl_tree),$--),H(A,v,A.bl_tree),X(A,$-3,2)):$<=10?(H(A,b,A.bl_tree),X(A,$-3,3)):(H(A,S,A.bl_tree),X(A,$-11,7));J=B,be=($=0)===ie?(re=138,3):B===ie?(re=6,3):(re=7,4)}}r(k);var z=!1;function R(A,D,W,q){X(A,(a<<1)+(q?1:0),3),(function(B,J,ie,$){Q(B),$&&(K(B,ie),K(B,~ie)),n.arraySet(B.pending_buf,B.window,J,ie,B.pending),B.pending+=ie})(A,D,W,!0)}t._tr_init=function(A){z||((function(){var D,W,q,B,J,ie=new Array(p+1);for(B=q=0;B<o-1;B++)for(F[B]=q,D=0;D<1<<w[B];D++)y[q++]=B;for(y[q-1]=B,B=J=0;B<16;B++)for(k[B]=J,D=0;D<1<<T[B];D++)C[J++]=B;for(J>>=7;B<u;B++)for(k[B]=J<<7,D=0;D<1<<T[B]-7;D++)C[256+J++]=B;for(W=0;W<=p;W++)ie[W]=0;for(D=0;D<=143;)L[2*D+1]=8,D++,ie[8]++;for(;D<=255;)L[2*D+1]=9,D++,ie[9]++;for(;D<=279;)L[2*D+1]=7,D++,ie[7]++;for(;D<=287;)L[2*D+1]=8,D++,ie[8]++;for(ee(L,h+1,ie),D=0;D<u;D++)M[2*D+1]=5,M[2*D]=te(D,5);j=new Y(L,w,c+1,h,p),O=new Y(M,T,0,u,p),G=new Y(new Array(0),E,0,d,g)})(),z=!0),A.l_desc=new P(A.dyn_ltree,j),A.d_desc=new P(A.dyn_dtree,O),A.bl_desc=new P(A.bl_tree,G),A.bi_buf=0,A.bi_valid=0,Z(A)},t._tr_stored_block=R,t._tr_flush_block=function(A,D,W,q){var B,J,ie=0;0<A.level?(A.strm.data_type===2&&(A.strm.data_type=(function($){var re,be=4093624447;for(re=0;re<=31;re++,be>>>=1)if(1&be&&$.dyn_ltree[2*re]!==0)return i;if($.dyn_ltree[18]!==0||$.dyn_ltree[20]!==0||$.dyn_ltree[26]!==0)return s;for(re=32;re<c;re++)if($.dyn_ltree[2*re]!==0)return s;return i})(A)),Pe(A,A.l_desc),Pe(A,A.d_desc),ie=(function($){var re;for(x($,$.dyn_ltree,$.l_desc.max_code),x($,$.dyn_dtree,$.d_desc.max_code),Pe($,$.bl_desc),re=d-1;3<=re&&$.bl_tree[2*I[re]+1]===0;re--);return $.opt_len+=3*(re+1)+5+5+4,re})(A),B=A.opt_len+3+7>>>3,(J=A.static_len+3+7>>>3)<=B&&(B=J)):B=J=W+5,W+4<=B&&D!==-1?R(A,D,W,q):A.strategy===4||J===B?(X(A,2+(q?1:0),3),Se(A,L,M)):(X(A,4+(q?1:0),3),(function($,re,be,ge){var ct;for(X($,re-257,5),X($,be-1,5),X($,ge-4,4),ct=0;ct<ge;ct++)X($,$.bl_tree[2*I[ct]+1],3);V($,$.dyn_ltree,re-1),V($,$.dyn_dtree,be-1)})(A,A.l_desc.max_code+1,A.d_desc.max_code+1,ie+1),Se(A,A.dyn_ltree,A.dyn_dtree)),Z(A),q&&Q(A)},t._tr_tally=function(A,D,W){return A.pending_buf[A.d_buf+2*A.last_lit]=D>>>8&255,A.pending_buf[A.d_buf+2*A.last_lit+1]=255&D,A.pending_buf[A.l_buf+A.last_lit]=255&W,A.last_lit++,D===0?A.dyn_ltree[2*W]++:(A.matches++,D--,A.dyn_ltree[2*(y[W]+c+1)]++,A.dyn_dtree[2*N(D)]++),A.last_lit===A.lit_bufsize-1},t._tr_align=function(A){X(A,2,3),H(A,_,L),(function(D){D.bi_valid===16?(K(D,D.bi_buf),D.bi_buf=0,D.bi_valid=0):8<=D.bi_valid&&(D.pending_buf[D.pending++]=255&D.bi_buf,D.bi_buf>>=8,D.bi_valid-=8)})(A)}},{"../utils/common":41}],53:[function(l,e,t){"use strict";e.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(l,e,t){(function(n){(function(i,s){"use strict";if(!i.setImmediate){var r,a,o,c,h=1,u={},d=!1,f=i.document,p=Object.getPrototypeOf&&Object.getPrototypeOf(i);p=p&&p.setTimeout?p:i,r={}.toString.call(i.process)==="[object process]"?function(v){process.nextTick(function(){g(v)})}:(function(){if(i.postMessage&&!i.importScripts){var v=!0,b=i.onmessage;return i.onmessage=function(){v=!1},i.postMessage("","*"),i.onmessage=b,v}})()?(c="setImmediate$"+Math.random()+"$",i.addEventListener?i.addEventListener("message",_,!1):i.attachEvent("onmessage",_),function(v){i.postMessage(c+v,"*")}):i.MessageChannel?((o=new MessageChannel).port1.onmessage=function(v){g(v.data)},function(v){o.port2.postMessage(v)}):f&&"onreadystatechange"in f.createElement("script")?(a=f.documentElement,function(v){var b=f.createElement("script");b.onreadystatechange=function(){g(v),b.onreadystatechange=null,a.removeChild(b),b=null},a.appendChild(b)}):function(v){setTimeout(g,0,v)},p.setImmediate=function(v){typeof v!="function"&&(v=new Function(""+v));for(var b=new Array(arguments.length-1),S=0;S<b.length;S++)b[S]=arguments[S+1];var w={callback:v,args:b};return u[h]=w,r(h),h++},p.clearImmediate=m}function m(v){delete u[v]}function g(v){if(d)setTimeout(g,0,v);else{var b=u[v];if(b){d=!0;try{(function(S){var w=S.callback,T=S.args;switch(T.length){case 0:w();break;case 1:w(T[0]);break;case 2:w(T[0],T[1]);break;case 3:w(T[0],T[1],T[2]);break;default:w.apply(s,T)}})(b)}finally{m(v),d=!1}}}}function _(v){v.source===i&&typeof v.data=="string"&&v.data.indexOf(c)===0&&g(+v.data.slice(c.length))}})(typeof self>"u"?n===void 0?this:n:self)}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})});var Ko=1;var jo=3,In=0,Jo=1,Pt=2;var $o=1;var Qo=100;var ec=204,tc=205;var br=0,Sr=1,Mr=2,Ss=3,wr=4,Tr=5,Ar=6,Er=7,Di=0,nc=1,ic=2;var Wr=1,Xr=2,qr=3,Yr=4,Zr=5,Kr=6,jr=7,Rr="attached",sc="detached",Jr=300;var rc=302;var Ge=1e3,Ke=1001,xn=1002,rn=1003,Ui=1004;var Oi=1005;var _t=1006,Fi=1007;var Nt=1008;var $r=1009;var Os=1015;var Bi=1023;var ac=1028;var xt=2300,Vt=2301,ys=2302,yi=2303,Cr=2400,Ir=2401,Pr=2402,oc=2500;var Qr=0,ki=1,ti=2;var Fs=0;var zi="",fe="srgb",tt="srgb-linear",Nr="linear",vs="srgb";var bs=7680;var cc=519;var ea=35044;var sn=2e3,vi=2001;function al(l){for(let e=l.length-1;e>=0;--e)if(l[e]>=65535)return!0;return!1}function ol(l){return ArrayBuffer.isView(l)&&!(l instanceof DataView)}function Ms(l){return document.createElementNS("http://www.w3.org/1999/xhtml",l)}var ao={},qn=null;function Lr(...l){let e="THREE."+l.shift();qn?qn("log",e,...l):console.log(e,...l)}function lc(l){let e=l[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=l[1];t&&t.isStackTrace?l[0]+=" "+t.getLocation():l[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return l}function ye(...l){l=lc(l);let e="THREE."+l.shift();if(qn)qn("warn",e,...l);else{let t=l[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...l)}}function Me(...l){l=lc(l);let e="THREE."+l.shift();if(qn)qn("error",e,...l);else{let t=l[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...l)}}function Wn(...l){let e=l.join(" ");e in ao||(ao[e]=!0,ye(...l))}var cl={[br]:br,[Mr]:Ar,[wr]:wr,[Ss]:Tr,[Sr]:Sr,[Ar]:Mr,[Er]:Er,[Tr]:Ss},an=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,e);e.target=null}}},ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],oo=1234567,_i=Math.PI/180,Yn=180/Math.PI;function Lt(){let l=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ke[l&255]+ke[l>>8&255]+ke[l>>16&255]+ke[l>>24&255]+"-"+ke[e&255]+ke[e>>8&255]+"-"+ke[e>>16&15|64]+ke[e>>24&255]+"-"+ke[t&63|128]+ke[t>>8&255]+"-"+ke[t>>16&255]+ke[t>>24&255]+ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]).toLowerCase()}function ue(l,e,t){return Math.max(e,Math.min(t,l))}function ta(l,e){return(l%e+e)%e}function ll(l,e,t,n,i){return n+(l-e)*(i-n)/(t-e)}function hl(l,e,t){return l!==e?(t-l)/(e-l):0}function xi(l,e,t){return(1-t)*l+t*e}function ul(l,e,t,n){return xi(l,e,1-Math.exp(-t*n))}function dl(l,e=1){return e-Math.abs(ta(l,e*2)-e)}function fl(l,e,t){return l<=e?0:l>=t?1:(l=(l-e)/(t-e),l*l*(3-2*l))}function pl(l,e,t){return l<=e?0:l>=t?1:(l=(l-e)/(t-e),l*l*l*(l*(l*6-15)+10))}function ml(l,e){return l+Math.floor(Math.random()*(e-l+1))}function gl(l,e){return l+Math.random()*(e-l)}function _l(l){return l*(.5-Math.random())}function xl(l){l!==void 0&&(oo=l);let e=oo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function yl(l){return l*_i}function vl(l){return l*Yn}function bl(l){return l>0&&Number.isInteger(l)&&2**Math.round(Math.log2(l))===l}function Sl(l){return Math.pow(2,Math.ceil(Math.log(l)/Math.LN2))}function hc(l){return Math.pow(2,Math.floor(Math.log(l)/Math.LN2))}function Ml(l,e,t,n,i){let s=Math.cos,r=Math.sin,a=s(t/2),o=r(t/2),c=s((e+n)/2),h=r((e+n)/2),u=s((e-n)/2),d=r((e-n)/2),f=s((n-e)/2),p=r((n-e)/2);switch(i){case"XYX":l.set(a*h,o*u,o*d,a*c);break;case"YZY":l.set(o*d,a*h,o*u,a*c);break;case"ZXZ":l.set(o*u,o*d,a*h,a*c);break;case"XZX":l.set(a*h,o*p,o*f,a*c);break;case"YXY":l.set(o*f,a*h,o*p,a*c);break;case"ZYZ":l.set(o*p,o*f,a*h,a*c);break;default:ye("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Bs(l){switch(l.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function na(l,e){if(e.constructor===Float32Array)return l;let t=Bs(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(l/t,-1)}function ia(l,e){if(e.constructor===Float32Array)return l;let t=Bs(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(l*t)}var Ue={DEG2RAD:_i,RAD2DEG:Yn,generateUUID:Lt,clamp:ue,euclideanModulo:ta,mapLinear:ll,inverseLerp:hl,lerp:xi,damp:ul,pingpong:dl,smoothstep:fl,smootherstep:pl,randInt:ml,randFloat:gl,randFloatSpread:_l,seededRandom:xl,degToRad:yl,radToDeg:vl,isPowerOfTwo:bl,ceilPowerOfTwo:Sl,floorPowerOfTwo:hc,setQuaternionFromProperEuler:Ml,normalize:ia,denormalize:na},pe=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ue(this.x,e.x,t.x),this.y=ue(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ue(this.x,e,t),this.y=ue(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ue(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ue(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*n-r*i+e.x,this.y=s*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ee=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,r,a){let o=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=s[r+0],f=s[r+1],p=s[r+2],m=s[r+3];if(u!==m||o!==d||c!==f||h!==p){let g=o*d+c*f+h*p+u*m;g<0&&(d=-d,f=-f,p=-p,m=-m,g=-g);let _=1-a;if(g<.9995){let v=Math.acos(g),b=Math.sin(v);_=Math.sin(_*v)/b,a=Math.sin(a*v)/b,o=o*_+d*a,c=c*_+f*a,h=h*_+p*a,u=u*_+m*a}else{o=o*_+d*a,c=c*_+f*a,h=h*_+p*a,u=u*_+m*a;let v=1/Math.sqrt(o*o+c*c+h*h+u*u);o*=v,c*=v,h*=v,u*=v}}e[t]=o,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,r){let a=n[i],o=n[i+1],c=n[i+2],h=n[i+3],u=s[r],d=s[r+1],f=s[r+2],p=s[r+3];return e[t]=a*p+h*u+o*f-c*d,e[t+1]=o*p+h*d+c*u-a*f,e[t+2]=c*p+h*f+a*d-o*u,e[t+3]=h*p-a*u-o*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,r=e._order,a=Math.cos,o=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=o(n/2),f=o(i/2),p=o(s/2);switch(r){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:ye("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-o)*f,this._y=(s-c)*f,this._z=(r-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-o)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(s+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(s-c)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(o+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(r-i)/f,this._x=(s+c)/f,this._y=(o+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ue(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,r=e._w,a=t._x,o=t._y,c=t._z,h=t._w;return this._x=n*h+r*a+i*c-s*o,this._y=i*h+r*o+s*a-n*c,this._z=s*h+r*c+n*o-i*a,this._w=r*h-n*a-i*o-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,r=e._w,a=this.dot(e);a<0&&(n=-n,i=-i,s=-s,r=-r,a=-a);let o=1-t;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);o=Math.sin(o*c)/h,t=Math.sin(t*c)/h,this._x=this._x*o+n*t,this._y=this._y*o+i*t,this._z=this._z*o+s*t,this._w=this._w*o+r*t,this._onChangeCallback()}else this._x=this._x*o+n*t,this._y=this._y*o+i*t,this._z=this._z*o+s*t,this._w=this._w*o+r*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(co.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(co.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,r=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,a=e.z,o=e.w,c=2*(r*i-a*n),h=2*(a*t-s*i),u=2*(s*n-r*t);return this.x=t+o*c+r*u-a*h,this.y=n+o*h+a*c-s*u,this.z=i+o*u+s*h-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ue(this.x,e.x,t.x),this.y=ue(this.y,e.y,t.y),this.z=ue(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ue(this.x,e,t),this.y=ue(this.y,e,t),this.z=ue(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ue(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,r=t.x,a=t.y,o=t.z;return this.x=i*o-s*a,this.y=s*r-n*o,this.z=n*a-i*r,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Js.copy(this).projectOnVector(e),this.sub(Js)}reflect(e){return this.sub(Js.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ue(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Js=new U,co=new Ee,ce=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,i,s,r,a,o,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,a,o,c)}set(e,t,n,i,s,r,a,o,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=o,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],a=n[3],o=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=i[0],g=i[3],_=i[6],v=i[1],b=i[4],S=i[7],w=i[2],T=i[5],E=i[8];return s[0]=r*m+a*v+o*w,s[3]=r*g+a*b+o*T,s[6]=r*_+a*S+o*E,s[1]=c*m+h*v+u*w,s[4]=c*g+h*b+u*T,s[7]=c*_+h*S+u*E,s[2]=d*m+f*v+p*w,s[5]=d*g+f*b+p*T,s[8]=d*_+f*S+p*E,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],o=e[6],c=e[7],h=e[8];return t*r*h-t*a*c-n*s*h+n*a*o+i*s*c-i*r*o}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],o=e[6],c=e[7],h=e[8],u=h*r-a*c,d=a*o-h*s,f=c*s-r*o,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(i*c-h*n)*m,e[2]=(a*n-i*r)*m,e[3]=d*m,e[4]=(h*t-i*o)*m,e[5]=(i*s-a*t)*m,e[6]=f*m,e[7]=(n*o-c*t)*m,e[8]=(r*t-n*s)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,r,a){let o=Math.cos(s),c=Math.sin(s);return this.set(n*o,n*c,-n*(o*r+c*a)+r+e,-i*c,i*o,-i*(-c*r+o*a)+a+t,0,0,1),this}scale(e,t){return Wn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($s.makeScale(e,t)),this}rotate(e){return Wn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($s.makeRotation(-e)),this}translate(e,t){return Wn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($s.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},$s=new ce,lo=new ce().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ho=new ce().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wl(){let l={enabled:!0,workingColorSpace:tt,spaces:{},convert:function(i,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===vs&&(i.r=Ht(i.r),i.g=Ht(i.g),i.b=Ht(i.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===vs&&(i.r=Xn(i.r),i.g=Xn(i.g),i.b=Xn(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===zi?Nr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,r){return i.copy(this.spaces[r].fromXYZ).multiply(this.spaces[s].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return l.define({[tt]:{primaries:e,whitePoint:n,transfer:Nr,toXYZ:lo,fromXYZ:ho,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:fe},outputColorSpaceConfig:{drawingBufferColorSpace:fe}},[fe]:{primaries:e,whitePoint:n,transfer:vs,toXYZ:lo,fromXYZ:ho,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:fe}}}),l}var Ie=wl();function Ht(l){return l<.04045?l*.0773993808:Math.pow(l*.9478672986+.0521327014,2.4)}function Xn(l){return l<.0031308?l*12.92:1.055*Math.pow(l,.41666)-.055}var Nn,Zn=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Nn===void 0&&(Nn=Ms("canvas")),Nn.width=e.width,Nn.height=e.height;let i=Nn.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Nn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ms("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=Ht(s[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ht(t[n]/255)*255):t[n]=Ht(t[n]);return{data:t,width:e.width,height:e.height}}else return ye("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Tl=0,yn=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Tl++}),this.uuid=Lt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?s.push(Qs(i[r].image)):s.push(Qs(i[r]))}else s=Qs(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function Qs(l){return typeof HTMLImageElement<"u"&&l instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&l instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&l instanceof ImageBitmap?Zn.getDataURL(l):l.data?{data:Array.from(l.data),width:l.width,height:l.height,type:l.data.constructor.name}:(ye("Texture: Unable to serialize Texture."),{})}var Al=0,er=new U,nt=class l extends an{constructor(e=l.DEFAULT_IMAGE,t=l.DEFAULT_MAPPING,n=Ke,i=Ke,s=_t,r=Nt,a=Bi,o=$r,c=l.DEFAULT_ANISOTROPY,h=zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Al++}),this.uuid=Lt(),this.name="",this.source=new yn(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=o,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(er).x}get height(){return this.source.getSize(er).y}get depth(){return this.source.getSize(er).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){ye(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){ye(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Jr)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ge:e.x=e.x-Math.floor(e.x);break;case Ke:e.x=e.x<0?0:1;break;case xn:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ge:e.y=e.y-Math.floor(e.y);break;case Ke:e.y=e.y<0?0:1;break;case xn:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};nt.DEFAULT_IMAGE=null;nt.DEFAULT_MAPPING=Jr;nt.DEFAULT_ANISOTROPY=1;var ht=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,o=e.elements,c=o[0],h=o[4],u=o[8],d=o[1],f=o[5],p=o[9],m=o[2],g=o[6],_=o[10];if(Math.abs(h-d)<.01&&Math.abs(u-m)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+m)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,S=(f+1)/2,w=(_+1)/2,T=(h+d)/4,E=(u+m)/4,I=(p+g)/4;return b>S&&b>w?b<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(b),i=T/n,s=E/n):S>w?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=T/i,s=I/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=E/s,i=I/s),this.set(n,i,s,t),this}let v=Math.sqrt((g-p)*(g-p)+(u-m)*(u-m)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(u-m)/v,this.z=(d-h)/v,this.w=Math.acos((c+f+_-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ue(this.x,e.x,t.x),this.y=ue(this.y,e.y,t.y),this.z=ue(this.z,e.z,t.z),this.w=ue(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ue(this.x,e,t),this.y=ue(this.y,e,t),this.z=ue(this.z,e,t),this.w=ue(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ue(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var se=class l{static{this.prototype.isMatrix4=!0}constructor(e,t,n,i,s,r,a,o,c,h,u,d,f,p,m,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,a,o,c,h,u,d,f,p,m,g)}set(e,t,n,i,s,r,a,o,c,h,u,d,f,p,m,g){let _=this.elements;return _[0]=e,_[4]=t,_[8]=n,_[12]=i,_[1]=s,_[5]=r,_[9]=a,_[13]=o,_[2]=c,_[6]=h,_[10]=u,_[14]=d,_[3]=f,_[7]=p,_[11]=m,_[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new l().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/Ln.setFromMatrixColumn(e,0).length(),s=1/Ln.setFromMatrixColumn(e,1).length(),r=1/Ln.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,r=Math.cos(n),a=Math.sin(n),o=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=r*h,f=r*u,p=a*h,m=a*u;t[0]=o*h,t[4]=-o*u,t[8]=c,t[1]=f+p*c,t[5]=d-m*c,t[9]=-a*o,t[2]=m-d*c,t[6]=p+f*c,t[10]=r*o}else if(e.order==="YXZ"){let d=o*h,f=o*u,p=c*h,m=c*u;t[0]=d+m*a,t[4]=p*a-f,t[8]=r*c,t[1]=r*u,t[5]=r*h,t[9]=-a,t[2]=f*a-p,t[6]=m+d*a,t[10]=r*o}else if(e.order==="ZXY"){let d=o*h,f=o*u,p=c*h,m=c*u;t[0]=d-m*a,t[4]=-r*u,t[8]=p+f*a,t[1]=f+p*a,t[5]=r*h,t[9]=m-d*a,t[2]=-r*c,t[6]=a,t[10]=r*o}else if(e.order==="ZYX"){let d=r*h,f=r*u,p=a*h,m=a*u;t[0]=o*h,t[4]=p*c-f,t[8]=d*c+m,t[1]=o*u,t[5]=m*c+d,t[9]=f*c-p,t[2]=-c,t[6]=a*o,t[10]=r*o}else if(e.order==="YZX"){let d=r*o,f=r*c,p=a*o,m=a*c;t[0]=o*h,t[4]=m-d*u,t[8]=p*u+f,t[1]=u,t[5]=r*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-m*u}else if(e.order==="XZY"){let d=r*o,f=r*c,p=a*o,m=a*c;t[0]=o*h,t[4]=-u,t[8]=c*h,t[1]=d*u+m,t[5]=r*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=a*h,t[10]=m*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(El,e,Rl)}lookAt(e,t,n){let i=this.elements;return Qe.subVectors(e,t),Qe.lengthSq()===0&&(Qe.z=1),Qe.normalize(),Jt.crossVectors(n,Qe),Jt.lengthSq()===0&&(Math.abs(n.z)===1?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),Jt.crossVectors(n,Qe)),Jt.normalize(),qi.crossVectors(Qe,Jt),i[0]=Jt.x,i[4]=qi.x,i[8]=Qe.x,i[1]=Jt.y,i[5]=qi.y,i[9]=Qe.y,i[2]=Jt.z,i[6]=qi.z,i[10]=Qe.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],a=n[4],o=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],g=n[10],_=n[14],v=n[3],b=n[7],S=n[11],w=n[15],T=i[0],E=i[4],I=i[8],L=i[12],M=i[1],C=i[5],y=i[9],F=i[13],j=i[2],O=i[6],G=i[10],k=i[14],Y=i[3],P=i[7],N=i[11],K=i[15];return s[0]=r*T+a*M+o*j+c*Y,s[4]=r*E+a*C+o*O+c*P,s[8]=r*I+a*y+o*G+c*N,s[12]=r*L+a*F+o*k+c*K,s[1]=h*T+u*M+d*j+f*Y,s[5]=h*E+u*C+d*O+f*P,s[9]=h*I+u*y+d*G+f*N,s[13]=h*L+u*F+d*k+f*K,s[2]=p*T+m*M+g*j+_*Y,s[6]=p*E+m*C+g*O+_*P,s[10]=p*I+m*y+g*G+_*N,s[14]=p*L+m*F+g*k+_*K,s[3]=v*T+b*M+S*j+w*Y,s[7]=v*E+b*C+S*O+w*P,s[11]=v*I+b*y+S*G+w*N,s[15]=v*L+b*F+S*k+w*K,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],r=e[1],a=e[5],o=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],g=e[11],_=e[15],v=o*f-c*d,b=a*f-c*u,S=a*d-o*u,w=r*f-c*h,T=r*d-o*h,E=r*u-a*h;return t*(m*v-g*b+_*S)-n*(p*v-g*w+_*T)+i*(p*b-m*w+_*E)-s*(p*S-m*T+g*E)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[1],r=e[5],a=e[9],o=e[2],c=e[6],h=e[10];return t*(r*h-a*c)-n*(s*h-a*o)+i*(s*c-r*o)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],o=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],g=e[14],_=e[15],v=t*a-n*r,b=t*o-i*r,S=t*c-s*r,w=n*o-i*a,T=n*c-s*a,E=i*c-s*o,I=h*m-u*p,L=h*g-d*p,M=h*_-f*p,C=u*g-d*m,y=u*_-f*m,F=d*_-f*g,j=v*F-b*y+S*C+w*M-T*L+E*I;if(j===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/j;return e[0]=(a*F-o*y+c*C)*O,e[1]=(i*y-n*F-s*C)*O,e[2]=(m*E-g*T+_*w)*O,e[3]=(d*T-u*E-f*w)*O,e[4]=(o*M-r*F-c*L)*O,e[5]=(t*F-i*M+s*L)*O,e[6]=(g*S-p*E-_*b)*O,e[7]=(h*E-d*S+f*b)*O,e[8]=(r*y-a*M+c*I)*O,e[9]=(n*M-t*y-s*I)*O,e[10]=(p*T-m*S+_*v)*O,e[11]=(u*S-h*T-f*v)*O,e[12]=(a*L-r*C-o*I)*O,e[13]=(t*C-n*L+i*I)*O,e[14]=(m*b-p*w-g*v)*O,e[15]=(h*w-u*b+d*v)*O,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,r=e.x,a=e.y,o=e.z,c=s*r,h=s*a;return this.set(c*r+n,c*a-i*o,c*o+i*a,0,c*a+i*o,h*a+n,h*o-i*r,0,c*o-i*a,h*o+i*r,s*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,r){return this.set(1,n,s,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,r=t._y,a=t._z,o=t._w,c=s+s,h=r+r,u=a+a,d=s*c,f=s*h,p=s*u,m=r*h,g=r*u,_=a*u,v=o*c,b=o*h,S=o*u,w=n.x,T=n.y,E=n.z;return i[0]=(1-(m+_))*w,i[1]=(f+S)*w,i[2]=(p-b)*w,i[3]=0,i[4]=(f-S)*T,i[5]=(1-(d+_))*T,i[6]=(g+v)*T,i[7]=0,i[8]=(p+b)*E,i[9]=(g-v)*E,i[10]=(1-(d+m))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let r=Ln.set(i[0],i[1],i[2]).length(),a=Ln.set(i[4],i[5],i[6]).length(),o=Ln.set(i[8],i[9],i[10]).length();s<0&&(r=-r),pt.copy(this);let c=1/r,h=1/a,u=1/o;return pt.elements[0]*=c,pt.elements[1]*=c,pt.elements[2]*=c,pt.elements[4]*=h,pt.elements[5]*=h,pt.elements[6]*=h,pt.elements[8]*=u,pt.elements[9]*=u,pt.elements[10]*=u,t.setFromRotationMatrix(pt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,r,a=sn,o=!1){let c=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),p,m;if(o)p=s/(r-s),m=r*s/(r-s);else if(a===sn)p=-(r+s)/(r-s),m=-2*r*s/(r-s);else if(a===vi)p=-r/(r-s),m=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,r,a=sn,o=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),p,m;if(o)p=1/(r-s),m=r/(r-s);else if(a===sn)p=-2/(r-s),m=-(r+s)/(r-s);else if(a===vi)p=-1/(r-s),m=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ln=new U,pt=new se,El=new U(0,0,0),Rl=new U(1,1,1),Jt=new U,qi=new U,Qe=new U,uo=new se,fo=new Ee,yt=class l{constructor(e=0,t=0,n=0,i=l.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],r=i[4],a=i[8],o=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ue(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ue(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(o,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ue(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(o,s));break;case"ZYX":this._y=Math.asin(-ue(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(o,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(ue(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ue(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:ye("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return uo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(uo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fo.setFromEuler(this),this.setFromQuaternion(fo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};yt.DEFAULT_ORDER="XYZ";var ws=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Cl=0,po=new U,Dn=new Ee,Ot=new se,Yi=new U,oi=new U,Il=new U,Pl=new Ee,mo=new U(1,0,0),go=new U(0,1,0),_o=new U(0,0,1),xo={type:"added"},Nl={type:"removed"},Un={type:"childadded",child:null},tr={type:"childremoved",child:null},Re=class l extends an{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cl++}),this.uuid=Lt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=l.DEFAULT_UP.clone();let e=new U,t=new yt,n=new Ee,i=new U(1,1,1);function s(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new se},normalMatrix:{value:new ce}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=l.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=l.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ws,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Dn.setFromAxisAngle(e,t),this.quaternion.multiply(Dn),this}rotateOnWorldAxis(e,t){return Dn.setFromAxisAngle(e,t),this.quaternion.premultiply(Dn),this}rotateX(e){return this.rotateOnAxis(mo,e)}rotateY(e){return this.rotateOnAxis(go,e)}rotateZ(e){return this.rotateOnAxis(_o,e)}translateOnAxis(e,t){return po.copy(e).applyQuaternion(this.quaternion),this.position.add(po.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(mo,e)}translateY(e){return this.translateOnAxis(go,e)}translateZ(e){return this.translateOnAxis(_o,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ot.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Yi.copy(e):Yi.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),oi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ot.lookAt(oi,Yi,this.up):Ot.lookAt(Yi,oi,this.up),this.quaternion.setFromRotationMatrix(Ot),i&&(Ot.extractRotation(i.matrixWorld),Dn.setFromRotationMatrix(Ot),this.quaternion.premultiply(Dn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Me("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xo),Un.child=e,this.dispatchEvent(Un),Un.child=null):Me("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Nl),tr.child=e,this.dispatchEvent(tr),tr.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ot.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ot.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ot),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xo),Un.child=e,this.dispatchEvent(Un),Un.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oi,e,Il),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oi,Pl,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,o){return a[o.uuid]===void 0&&(a[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let o=a.shapes;if(Array.isArray(o))for(let c=0,h=o.length;c<h;c++){let u=o[c];s(e.shapes,u)}else s(e.shapes,o)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let o=0,c=this.material.length;o<c;o++)a.push(s(e.materials,this.material[o]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let o=this.animations[a];i.animations.push(s(e.animations,o))}}if(t){let a=r(e.geometries),o=r(e.materials),c=r(e.textures),h=r(e.images),u=r(e.shapes),d=r(e.skeletons),f=r(e.animations),p=r(e.nodes);a.length>0&&(n.geometries=a),o.length>0&&(n.materials=o),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function r(a){let o=[];for(let c in a){let h=a[c];delete h.metadata,o.push(h)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Re.DEFAULT_UP=new U(0,1,0);Re.DEFAULT_MATRIX_AUTO_UPDATE=!0;Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var He=class extends Re{constructor(){super(),this.isGroup=!0,this.type="Group"}};var uc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$t={h:0,s:0,l:0},Zi={h:0,s:0,l:0};function nr(l,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?l+(e-l)*6*t:t<1/2?e:t<2/3?l+(e-l)*6*(2/3-t):l}var ae=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=fe){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ie.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ie.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ie.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ie.workingColorSpace){if(e=ta(e,1),t=ue(t,0,1),n=ue(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,r=2*n-s;this.r=nr(r,s,e+1/3),this.g=nr(r,s,e),this.b=nr(r,s,e-1/3)}return Ie.colorSpaceToWorking(this,i),this}setStyle(e,t=fe){function n(s){s!==void 0&&parseFloat(s)<1&&ye("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseFloat(s[1]))/100,Math.min(100,parseFloat(s[2]))/100,Math.min(100,parseFloat(s[3]))/100,t);break;case"hsl":case"hsla":if(s=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:ye("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);ye("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=fe){let n=uc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ye("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ht(e.r),this.g=Ht(e.g),this.b=Ht(e.b),this}copyLinearToSRGB(e){return this.r=Xn(e.r),this.g=Xn(e.g),this.b=Xn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=fe){return Ie.workingToColorSpace(ze.copy(this),e),Math.round(ue(ze.r*255,0,255))*65536+Math.round(ue(ze.g*255,0,255))*256+Math.round(ue(ze.b*255,0,255))}getHexString(e=fe){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ie.workingColorSpace){Ie.workingToColorSpace(ze.copy(this),t);let n=ze.r,i=ze.g,s=ze.b,r=Math.max(n,i,s),a=Math.min(n,i,s),o,c,h=(a+r)/2;if(a===r)o=0,c=0;else{let u=r-a;switch(c=h<=.5?u/(r+a):u/(2-r-a),r){case n:o=(i-s)/u+(i<s?6:0);break;case i:o=(s-n)/u+2;break;case s:o=(n-i)/u+4;break}o/=6}return e.h=o,e.s=c,e.l=h,e}getRGB(e,t=Ie.workingColorSpace){return Ie.workingToColorSpace(ze.copy(this),t),e.r=ze.r,e.g=ze.g,e.b=ze.b,e}getStyle(e=fe){Ie.workingToColorSpace(ze.copy(this),e);let t=ze.r,n=ze.g,i=ze.b;return e!==fe?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL($t),this.setHSL($t.h+e,$t.s+t,$t.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL($t),e.getHSL(Zi);let n=xi($t.h,Zi.h,t),i=xi($t.s,Zi.s,t),s=xi($t.l,Zi.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ze=new ae;ae.NAMES=uc;var Et=class extends Re{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yt,this.environmentIntensity=1,this.environmentRotation=new yt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},mt=new U,Ft=new U,ir=new U,Bt=new U,On=new U,Fn=new U,yo=new U,sr=new U,rr=new U,ar=new U,or=new ht,cr=new ht,lr=new ht,Tt=class l{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),mt.subVectors(e,t),i.cross(mt);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){mt.subVectors(i,t),Ft.subVectors(n,t),ir.subVectors(e,t);let r=mt.dot(mt),a=mt.dot(Ft),o=mt.dot(ir),c=Ft.dot(Ft),h=Ft.dot(ir),u=r*c-a*a;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(c*o-a*h)*d,p=(r*h-a*o)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Bt)===null?!1:Bt.x>=0&&Bt.y>=0&&Bt.x+Bt.y<=1}static getInterpolation(e,t,n,i,s,r,a,o){return this.getBarycoord(e,t,n,i,Bt)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(s,Bt.x),o.addScaledVector(r,Bt.y),o.addScaledVector(a,Bt.z),o)}static getInterpolatedAttribute(e,t,n,i,s,r){return or.setScalar(0),cr.setScalar(0),lr.setScalar(0),or.fromBufferAttribute(e,t),cr.fromBufferAttribute(e,n),lr.fromBufferAttribute(e,i),r.setScalar(0),r.addScaledVector(or,s.x),r.addScaledVector(cr,s.y),r.addScaledVector(lr,s.z),r}static isFrontFacing(e,t,n,i){return mt.subVectors(n,t),Ft.subVectors(e,t),mt.cross(Ft).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mt.subVectors(this.c,this.b),Ft.subVectors(this.a,this.b),mt.cross(Ft).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return l.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return l.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return l.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return l.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return l.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,r,a;On.subVectors(i,n),Fn.subVectors(s,n),sr.subVectors(e,n);let o=On.dot(sr),c=Fn.dot(sr);if(o<=0&&c<=0)return t.copy(n);rr.subVectors(e,i);let h=On.dot(rr),u=Fn.dot(rr);if(h>=0&&u<=h)return t.copy(i);let d=o*u-h*c;if(d<=0&&o>=0&&h<=0&&o-h>0)return r=o/(o-h),t.copy(n).addScaledVector(On,r);ar.subVectors(e,s);let f=On.dot(ar),p=Fn.dot(ar);if(p>=0&&f<=p)return t.copy(s);let m=f*c-o*p;if(m<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(Fn,a);let g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return yo.subVectors(s,i),a=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(yo,a);let _=1/(g+m+d);return r=m*_,a=d*_,t.copy(n).addScaledVector(On,r).addScaledVector(Fn,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},qe=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(gt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(gt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=gt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let r=0,a=s.count;r<a;r++)e.isMesh===!0?e.getVertexPosition(r,gt):gt.fromBufferAttribute(s,r),gt.applyMatrix4(e.matrixWorld),this.expandByPoint(gt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ki.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ki.copy(n.boundingBox)),Ki.applyMatrix4(e.matrixWorld),this.union(Ki)}let i=e.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,gt),gt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ci),ji.subVectors(this.max,ci),Bn.subVectors(e.a,ci),kn.subVectors(e.b,ci),zn.subVectors(e.c,ci),Qt.subVectors(kn,Bn),en.subVectors(zn,kn),pn.subVectors(Bn,zn);let t=[0,-Qt.z,Qt.y,0,-en.z,en.y,0,-pn.z,pn.y,Qt.z,0,-Qt.x,en.z,0,-en.x,pn.z,0,-pn.x,-Qt.y,Qt.x,0,-en.y,en.x,0,-pn.y,pn.x,0];return!hr(t,Bn,kn,zn,ji)||(t=[1,0,0,0,1,0,0,0,1],!hr(t,Bn,kn,zn,ji))?!1:(Ji.crossVectors(Qt,en),t=[Ji.x,Ji.y,Ji.z],hr(t,Bn,kn,zn,ji))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(gt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},kt=[new U,new U,new U,new U,new U,new U,new U,new U],gt=new U,Ki=new qe,Bn=new U,kn=new U,zn=new U,Qt=new U,en=new U,pn=new U,ci=new U,ji=new U,Ji=new U,mn=new U;function hr(l,e,t,n,i){for(let s=0,r=l.length-3;s<=r;s+=3){mn.fromArray(l,s);let a=i.x*Math.abs(mn.x)+i.y*Math.abs(mn.y)+i.z*Math.abs(mn.z),o=e.dot(mn),c=t.dot(mn),h=n.dot(mn);if(Math.max(-Math.max(o,c,h),Math.min(o,c,h))>a)return!1}return!0}var Ne=new U,$i=new pe,Ll=0,xe=class extends an{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ll++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ea,this.updateRanges=[],this.gpuType=Os,this.version=0,this._normalizationScale=e!==void 0?Bs(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)$i.fromBufferAttribute(this,t),$i.applyMatrix3(e),this.setXY(t,$i.x,$i.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ne.fromBufferAttribute(this,t),Ne.applyMatrix3(e),this.setXYZ(t,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ne.fromBufferAttribute(this,t),Ne.applyMatrix4(e),this.setXYZ(t,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ne.fromBufferAttribute(this,t),Ne.applyNormalMatrix(e),this.setXYZ(t,Ne.x,Ne.y,Ne.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ne.fromBufferAttribute(this,t),Ne.transformDirection(e),this.setXYZ(t,Ne.x,Ne.y,Ne.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):na(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):ia(e,this.array)}};var Ts=class extends xe{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var As=class extends xe{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ve=class extends xe{constructor(e,t,n){super(new Float32Array(e),t,n)}},Dl=new qe,li=new U,ur=new U,je=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Dl.setFromPoints(e).getCenter(n);let i=0;for(let s=0,r=e.length;s<r;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;li.subVectors(e,this.center);let t=li.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(li,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ur.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(li.copy(e.center).add(ur)),this.expandByPoint(li.copy(e.center).sub(ur))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ul=0,lt=new se,dr=new Re,Gn=new U,et=new qe,hi=new qe,Oe=new U,Te=class l extends an{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ul++}),this.uuid=Lt(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(al(e)?As:Ts)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new ce().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return lt.makeRotationFromQuaternion(e),this.applyMatrix4(lt),this}rotateX(e){return lt.makeRotationX(e),this.applyMatrix4(lt),this}rotateY(e){return lt.makeRotationY(e),this.applyMatrix4(lt),this}rotateZ(e){return lt.makeRotationZ(e),this.applyMatrix4(lt),this}translate(e,t,n){return lt.makeTranslation(e,t,n),this.applyMatrix4(lt),this}scale(e,t,n){return lt.makeScale(e,t,n),this.applyMatrix4(lt),this}lookAt(e){return dr.lookAt(e),dr.updateMatrix(),this.applyMatrix4(dr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gn).negate(),this.translate(Gn.x,Gn.y,Gn.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let r=e[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new ve(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&ye("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qe);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Me("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];et.setFromBufferAttribute(s),this.morphTargetsRelative?(Oe.addVectors(this.boundingBox.min,et.min),this.boundingBox.expandByPoint(Oe),Oe.addVectors(this.boundingBox.max,et.max),this.boundingBox.expandByPoint(Oe)):(this.boundingBox.expandByPoint(et.min),this.boundingBox.expandByPoint(et.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Me('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new je);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Me("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(et.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){let a=t[s];hi.setFromBufferAttribute(a),this.morphTargetsRelative?(Oe.addVectors(et.min,hi.min),et.expandByPoint(Oe),Oe.addVectors(et.max,hi.max),et.expandByPoint(Oe)):(et.expandByPoint(hi.min),et.expandByPoint(hi.max))}et.getCenter(n);let i=0;for(let s=0,r=e.count;s<r;s++)Oe.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Oe));if(t)for(let s=0,r=t.length;s<r;s++){let a=t[s],o=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Oe.fromBufferAttribute(a,c),o&&(Gn.fromBufferAttribute(e,c),Oe.add(Gn)),i=Math.max(i,n.distanceToSquared(Oe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Me('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Me("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,s=t.uv,r=this.getAttribute("tangent");(r===void 0||r.count!==n.count)&&(r=new xe(new Float32Array(4*n.count),4),this.setAttribute("tangent",r));let a=[],o=[],c=new Uint8Array(n.count);for(let L=0;L<n.count;L++)a[L]=new U,o[L]=new U;let h=new U,u=new U,d=new U,f=new pe,p=new pe,m=new pe,g=new U,_=new U;function v(L,M,C){c[L]=c[M]=c[C]=1,h.fromBufferAttribute(n,L),u.fromBufferAttribute(n,M),d.fromBufferAttribute(n,C),f.fromBufferAttribute(s,L),p.fromBufferAttribute(s,M),m.fromBufferAttribute(s,C),u.sub(h),d.sub(h),p.sub(f),m.sub(f);let y=1/(p.x*m.y-m.x*p.y);isFinite(y)&&(g.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(y),_.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(y),a[L].add(g),a[M].add(g),a[C].add(g),o[L].add(_),o[M].add(_),o[C].add(_))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let L=0,M=b.length;L<M;++L){let C=b[L],y=C.start,F=C.count;for(let j=y,O=y+F;j<O;j+=3)v(e.getX(j+0),e.getX(j+1),e.getX(j+2))}let S=new U,w=new U,T=new U,E=new U;function I(L){T.fromBufferAttribute(i,L),E.copy(T);let M=a[L];S.copy(M),S.sub(T.multiplyScalar(T.dot(M))).normalize(),w.crossVectors(E,M);let y=w.dot(o[L])<0?-1:1;r.setXYZW(L,S.x,S.y,S.z,y)}for(let L=0,M=n.count;L<M;++L)c[L]&&I(L);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new xe(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new U,s=new U,r=new U,a=new U,o=new U,c=new U,h=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let p=e.getX(d+0),m=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,g),h.subVectors(r,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,p),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,g),a.add(h),o.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),r.fromBufferAttribute(t,d+2),h.subVectors(r,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Oe.fromBufferAttribute(e,t),Oe.normalize(),e.setXYZ(t,Oe.x,Oe.y,Oe.z)}toNonIndexed(){function e(a,o){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(o.length*h),f=0,p=0;for(let m=0,g=o.length;m<g;m++){a.isInterleavedBufferAttribute?f=o[m]*a.data.stride+a.offset:f=o[m]*h;for(let _=0;_<h;_++)d[p++]=c[f++]}return new xe(d,h,u)}if(this.index===null)return ye("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new l,n=this.index.array,i=this.attributes;for(let a in i){let o=i[a],c=e(o,n);t.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let o=[],c=s[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);o.push(f)}t.morphAttributes[a]=o}t.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let a=0,o=r.length;a<o;a++){let c=r[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let o=this.parameters;for(let c in o)o[c]!==void 0&&(e[c]=o[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let o in n){let c=n[o];e.data.attributes[o]=c.toJSON(e.data)}let i={},s=!1;for(let o in this.morphAttributes){let c=this.morphAttributes[o],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[o]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let r=e.groups;for(let c=0,h=r.length;c<h;c++){let u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Kn=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ea,this.updateRanges=[],this.version=0,this.uuid=Lt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=vo(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=vo(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function vo(l){return l.buffer._uuid===void 0&&(l.buffer._uuid=Lt()),l.byteOffset===0&&l.byteLength===l.buffer.byteLength?l.buffer._uuid:l.buffer._uuid+":"+l.byteOffset+":"+l.byteLength}var Xe=new U,jn=class l{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i,this._normalizationScale=e!==void 0?Bs(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Xe.fromBufferAttribute(this,t),Xe.applyMatrix4(e),this.setXYZ(t,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xe.fromBufferAttribute(this,t),Xe.applyNormalMatrix(e),this.setXYZ(t,Xe.x,Xe.y,Xe.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xe.fromBufferAttribute(this,t),Xe.transformDirection(e),this.setXYZ(t,Xe.x,Xe.y,Xe.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Lr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new xe(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new l(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Lr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):na(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):ia(e,this.data.array)}},fr=new U,Ol=new U,Fl=new ce,wt=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=fr.subVectors(n,t).cross(Ol.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(fr),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(r<0||r>1)?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Fl.getNormalMatrix(e),i=this.coplanarPoint(fr).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Bl=0,Ve=class extends an{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bl++}),this.uuid=Lt(),this.name="",this.type="Material",this.blending=$o,this.side=In,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ec,this.blendDst=tc,this.blendEquation=Qo,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ae(0,0,0),this.blendAlpha=0,this.depthFunc=Ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bs,this.stencilZFail=bs,this.stencilZPass=bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){ye(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){ye(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let r=[];for(let a in s){let o=s[a];delete o.metadata,r.push(o)}return r}if(t){let s=i(e.textures),r=i(e.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ae().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new wt().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new pe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new pe().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var zt=new U,pr=new U,Qi=new U,es=new U,vn=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zt)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=zt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zt.copy(this.origin).addScaledVector(this.direction,t),zt.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){pr.copy(e).add(t).multiplyScalar(.5),Qi.copy(t).sub(e).normalize(),es.copy(this.origin).sub(pr);let s=e.distanceTo(t)*.5,r=-this.direction.dot(Qi),a=es.dot(this.direction),o=-es.dot(Qi),c=es.lengthSq(),h=Math.abs(1-r*r),u,d,f,p;if(h>0)if(u=r*o-a,d=r*a-o,p=s*h,u>=0)if(d>=-p)if(d<=p){let m=1/h;u*=m,d*=m,f=u*(u+r*d+2*a)+d*(r*u+d+2*o)+c}else d=s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*o)+c;else d=-s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*o)+c;else d<=-p?(u=Math.max(0,-(-r*s+a)),d=u>0?-s:Math.min(Math.max(-s,-o),s),f=-u*u+d*(d+2*o)+c):d<=p?(u=0,d=Math.min(Math.max(-s,-o),s),f=d*(d+2*o)+c):(u=Math.max(0,-(r*s+a)),d=u>0?s:Math.min(Math.max(-s,-o),s),f=-u*u+d*(d+2*o)+c);else d=r>0?-s:s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*o)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(pr).addScaledVector(Qi,d),f}intersectSphere(e,t){if(e.radius<0)return null;zt.subVectors(e.center,this.origin);let n=zt.dot(this.direction),i=zt.dot(zt)-n*n,s=e.radius*e.radius;if(i>s)return null;let r=Math.sqrt(s-i),a=n-r,o=n+r;return o<0?null:a<0?this.at(o,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,r,a,o,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,r=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,r=(e.min.y-d.y)*h),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),u>=0?(a=(e.min.z-d.z)*u,o=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,o=(e.min.z-d.z)*u),n>o||a>i)||((a>n||n!==n)&&(n=a),(o<i||i!==i)&&(i=o),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,zt)!==null}intersectTriangle(e,t,n,i,s){let r=this.origin,a=this.direction,o=a.x,c=a.y,h=a.z,u=e.x-r.x,d=e.y-r.y,f=e.z-r.z,p=t.x-r.x,m=t.y-r.y,g=t.z-r.z,_=n.x-r.x,v=n.y-r.y,b=n.z-r.z,S=Math.abs(o),w=Math.abs(c),T=Math.abs(h),E,I,L,M,C,y,F,j,O,G,k,Y;if(S>=w&&S>=T?(L=o,y=u,O=p,Y=_,o>=0?(E=c,I=h,M=d,C=f,F=m,j=g,G=v,k=b):(E=h,I=c,M=f,C=d,F=g,j=m,G=b,k=v)):w>=T?(L=c,y=d,O=m,Y=v,c>=0?(E=h,I=o,M=f,C=u,F=g,j=p,G=b,k=_):(E=o,I=h,M=u,C=f,F=p,j=g,G=_,k=b)):(L=h,y=f,O=g,Y=b,h>=0?(E=o,I=c,M=u,C=d,F=p,j=m,G=_,k=v):(E=c,I=o,M=d,C=u,F=m,j=p,G=v,k=_)),L===0)return null;let P=E/L,N=I/L,K=1/L,X=M-P*y,H=C-N*y,te=F-P*O,ee=j-N*O,Z=G-P*Y,Q=k-N*Y,oe=Z*ee-Q*te,he=X*Q-H*Z,Se=te*H-ee*X;if(i){if(oe<0||he<0||Se<0)return null}else if((oe<0||he<0||Se<0)&&(oe>0||he>0||Se>0))return null;let Pe=oe+he+Se;if(Pe===0)return null;let x=K*(oe*y+he*O+Se*Y);return(Pe>0?x<0:x>0)?null:this.at(x/Pe,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},it=class extends Ve{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yt,this.combine=Di,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},bo=new se,gn=new vn,ts=new je,So=new U,ns=new U,is=new U,ss=new U,mr=new U,rs=new U,Mo=new U,as=new U,Be=class extends Re{constructor(e=new Te,t=new it){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(s&&a){rs.set(0,0,0);for(let o=0,c=s.length;o<c;o++){let h=a[o],u=s[o];h!==0&&(mr.fromBufferAttribute(u,e),r?rs.addScaledVector(mr,h):rs.addScaledVector(mr.sub(t),h))}t.add(rs)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ts.copy(n.boundingSphere),ts.applyMatrix4(s),gn.copy(e.ray).recast(e.near),!(ts.containsPoint(gn.origin)===!1&&(gn.intersectSphere(ts,So)===null||gn.origin.distanceToSquared(So)>(e.far-e.near)**2))&&(bo.copy(s).invert(),gn.copy(e.ray).applyMatrix4(bo),!(n.boundingBox!==null&&gn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,gn)))}_computeIntersections(e,t,n){let i,s=this.geometry,r=this.material,a=s.index,o=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(r))for(let p=0,m=d.length;p<m;p++){let g=d[p],_=r[g.materialIndex],v=Math.max(g.start,f.start),b=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let S=v,w=b;S<w;S+=3){let T=a.getX(S),E=a.getX(S+1),I=a.getX(S+2);i=os(this,_,e,n,c,h,u,T,E,I),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),m=Math.min(a.count,f.start+f.count);for(let g=p,_=m;g<_;g+=3){let v=a.getX(g),b=a.getX(g+1),S=a.getX(g+2);i=os(this,r,e,n,c,h,u,v,b,S),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(o!==void 0)if(Array.isArray(r))for(let p=0,m=d.length;p<m;p++){let g=d[p],_=r[g.materialIndex],v=Math.max(g.start,f.start),b=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let S=v,w=b;S<w;S+=3){let T=S,E=S+1,I=S+2;i=os(this,_,e,n,c,h,u,T,E,I),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),m=Math.min(o.count,f.start+f.count);for(let g=p,_=m;g<_;g+=3){let v=g,b=g+1,S=g+2;i=os(this,r,e,n,c,h,u,v,b,S),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function kl(l,e,t,n,i,s,r,a){let o;if(e.side===Jo?o=n.intersectTriangle(r,s,i,!0,a):o=n.intersectTriangle(i,s,r,e.side===In,a),o===null)return null;as.copy(a),as.applyMatrix4(l.matrixWorld);let c=t.ray.origin.distanceTo(as);return c<t.near||c>t.far?null:{distance:c,point:as.clone(),object:l}}function os(l,e,t,n,i,s,r,a,o,c){l.getVertexPosition(a,ns),l.getVertexPosition(o,is),l.getVertexPosition(c,ss);let h=kl(l,e,t,n,ns,is,ss,Mo);if(h){let u=new U;Tt.getBarycoord(Mo,ns,is,ss,u),i&&(h.uv=Tt.getInterpolatedAttribute(i,a,o,c,u,new pe)),s&&(h.uv1=Tt.getInterpolatedAttribute(s,a,o,c,u,new pe)),r&&(h.normal=Tt.getInterpolatedAttribute(r,a,o,c,u,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:o,c,normal:new U,materialIndex:0};Tt.getNormal(ns,is,ss,d.normal),h.face=d,h.barycoord=u}return h}var ui=new ht,wo=new ht,To=new ht,zl=new ht,Ao=new se,cs=new U,gr=new je,Eo=new se,_r=new vn,bn=class extends Be{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Rr,this.bindMatrix=new se,this.bindMatrixInverse=new se,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new qe),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,cs),this.boundingBox.expandByPoint(cs)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new je),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,cs),this.boundingSphere.expandByPoint(cs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gr.copy(this.boundingSphere),gr.applyMatrix4(i),e.ray.intersectsSphere(gr)!==!1&&(Eo.copy(i).invert(),_r.copy(e.ray).applyMatrix4(Eo),!(this.boundingBox!==null&&_r.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,_r)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new ht,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Rr?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===sc?this.bindMatrixInverse.copy(this.bindMatrix).invert():ye("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;wo.fromBufferAttribute(i.attributes.skinIndex,e),To.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(ui.copy(t),t.set(0,0,0,0)):(ui.set(t.x,t.y,t.z,1),t.set(0,0,0)),ui.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){let r=To.getComponent(s);if(r!==0){let a=wo.getComponent(s);Ao.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(zl.copy(ui).applyMatrix4(Ao),r)}}return t.isVector4&&(t.w=ui.w),t.applyMatrix4(this.bindMatrixInverse)}},on=class extends Re{constructor(){super(),this.isBone=!0,this.type="Bone"}},Sn=class extends nt{constructor(e=null,t=1,n=1,i,s,r,a,o,c=rn,h=rn,u,d){super(null,r,a,o,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ro=new se,Gl=new se,Mn=class l{constructor(e=[],t=[]){this.uuid=Lt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){ye("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new se)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new se;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=e.length;s<r;s++){let a=e[s]?e[s].matrixWorld:Gl;Ro.multiplyMatrices(a,t[s]),Ro.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new l(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Sn(t,e,e,Bi,Os);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],r=t[s];r===void 0&&(ye("Skeleton: No bone found with UUID:",s),r=new on),this.bones.push(r),this.boneInverses.push(new se().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let r=t[i];e.bones.push(r.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},Wt=class extends xe{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Hn=new se,Co=new se,ls=[],Io=new qe,Hl=new se,di=new Be,fi=new je,bi=class extends Be{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Wt(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Hl)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new qe),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hn),Io.copy(e.boundingBox).applyMatrix4(Hn),this.boundingBox.union(Io)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new je),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hn),fi.copy(e.boundingSphere).applyMatrix4(Hn),this.boundingSphere.union(fi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[r+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(di.geometry=this.geometry,di.material=this.material,di.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fi.copy(this.boundingSphere),fi.applyMatrix4(n),e.ray.intersectsSphere(fi)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Hn),Co.multiplyMatrices(n,Hn),di.matrixWorld=Co,di.raycast(e,ls);for(let r=0,a=ls.length;r<a;r++){let o=ls[r];o.instanceId=s,o.object=this,t.push(o)}ls.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Wt(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Sn(new Float32Array(i*this.count),i,this.count,ac,Os));let s=this.morphTexture.source.data.data,r=0;for(let c=0;c<n.length;c++)r+=n[c];let a=this.geometry.morphTargetsRelative?1:1-r,o=i*e;return s[o]=a,s.set(n,o+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},_n=new je,Vl=new pe(.5,.5),hs=new U,Es=class{constructor(e=new wt,t=new wt,n=new wt,i=new wt,s=new wt,r=new wt){this.planes=[e,t,n,i,s,r]}set(e,t,n,i,s,r){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(r),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=sn,n=!1){let i=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],h=s[4],u=s[5],d=s[6],f=s[7],p=s[8],m=s[9],g=s[10],_=s[11],v=s[12],b=s[13],S=s[14],w=s[15];if(i[0].setComponents(c-r,f-h,_-p,w-v).normalize(),i[1].setComponents(c+r,f+h,_+p,w+v).normalize(),i[2].setComponents(c+a,f+u,_+m,w+b).normalize(),i[3].setComponents(c-a,f-u,_-m,w-b).normalize(),n)i[4].setComponents(o,d,g,S).normalize(),i[5].setComponents(c-o,f-d,_-g,w-S).normalize();else if(i[4].setComponents(c-o,f-d,_-g,w-S).normalize(),t===sn)i[5].setComponents(c+o,f+d,_+g,w+S).normalize();else if(t===vi)i[5].setComponents(o,d,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_n.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_n.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_n)}intersectsSprite(e){_n.center.set(0,0,0);let t=Vl.distanceTo(e.center);return _n.radius=.7071067811865476+t,_n.applyMatrix4(e.matrixWorld),this.intersectsSphere(_n)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(hs.x=i.normal.x>0?e.max.x:e.min.x,hs.y=i.normal.y>0?e.max.y:e.min.y,hs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(hs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var st=class extends Ve{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Rs=new U,Cs=new U,Po=new se,pi=new vn,us=new je,xr=new U,No=new U,Xt=class extends Re{constructor(e=new Te,t=new st){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Rs.fromBufferAttribute(t,i-1),Cs.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Rs.distanceTo(Cs);e.setAttribute("lineDistance",new ve(n,1))}else ye("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),us.copy(n.boundingSphere),us.applyMatrix4(i),us.radius+=s,e.ray.intersectsSphere(us)===!1)return;Po.copy(i).invert(),pi.copy(e.ray).applyMatrix4(Po);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,r.start),p=Math.min(h.count,r.start+r.count);for(let m=f,g=p-1;m<g;m+=c){let _=h.getX(m),v=h.getX(m+1),b=ds(this,e,pi,o,_,v,m);b&&t.push(b)}if(this.isLineLoop){let m=h.getX(p-1),g=h.getX(f),_=ds(this,e,pi,o,m,g,p-1);_&&t.push(_)}}else{let f=Math.max(0,r.start),p=Math.min(d.count,r.start+r.count);for(let m=f,g=p-1;m<g;m+=c){let _=ds(this,e,pi,o,m,m+1,m);_&&t.push(_)}if(this.isLineLoop){let m=ds(this,e,pi,o,p-1,f,p-1);m&&t.push(m)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function ds(l,e,t,n,i,s,r){let a=l.geometry.attributes.position;if(Rs.fromBufferAttribute(a,i),Cs.fromBufferAttribute(a,s),t.distanceSqToSegment(Rs,Cs,xr,No)>n)return;xr.applyMatrix4(l.matrixWorld);let c=e.ray.origin.distanceTo(xr);if(!(c<e.near||c>e.far))return{distance:c,point:No.clone().applyMatrix4(l.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:l}}var Lo=new U,Do=new U,Rt=class extends Xt{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Lo.fromBufferAttribute(t,i),Do.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Lo.distanceTo(Do);e.setAttribute("lineDistance",new ve(n,1))}else ye("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Si=class extends Xt{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},vt=class extends Ve{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Uo=new se,Dr=new vn,fs=new je,ps=new U,qt=class extends Re{constructor(e=new Te,t=new vt){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fs.copy(n.boundingSphere),fs.applyMatrix4(i),fs.radius+=s,e.ray.intersectsSphere(fs)===!1)return;Uo.copy(i).invert(),Dr.copy(e.ray).applyMatrix4(Uo);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let p=d,m=f;p<m;p++){let g=c.getX(p);ps.fromBufferAttribute(u,g),Oo(ps,g,o,i,e,t,this)}}else{let d=Math.max(0,r.start),f=Math.min(u.count,r.start+r.count);for(let p=d,m=f;p<m;p++)ps.fromBufferAttribute(u,p),Oo(ps,p,o,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Oo(l,e,t,n,i,s,r){let a=Dr.distanceSqToPoint(l);if(a<t){let o=new U;Dr.closestPointToPoint(l,o),o.applyMatrix4(n);let c=i.ray.origin.distanceTo(o);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:o,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}var cn=class extends nt{constructor(e=[],t,n,i,s,r,a,o,c,h,u,d){super(null,r,a,o,c,h,i,s,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}};var Mi=class extends nt{constructor(e,t,n,i,s,r,a,o,c){super(e,t,n,i,s,r,a,o,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var wi=class l extends Te{constructor(e=1,t=1,n=1,i=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};let a=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);let o=[],c=[],h=[],u=[],d=0,f=0;p("z","y","x",-1,-1,n,t,e,r,s,0),p("z","y","x",1,-1,n,t,-e,r,s,1),p("x","z","y",1,1,e,n,t,i,r,2),p("x","z","y",1,-1,e,n,-t,i,r,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(o),this.setAttribute("position",new ve(c,3)),this.setAttribute("normal",new ve(h,3)),this.setAttribute("uv",new ve(u,2));function p(m,g,_,v,b,S,w,T,E,I,L){let M=S/E,C=w/I,y=S/2,F=w/2,j=T/2,O=E+1,G=I+1,k=0,Y=0,P=new U;for(let N=0;N<G;N++){let K=N*C-F;for(let X=0;X<O;X++){let H=X*M-y;P[m]=H*v,P[g]=K*b,P[_]=j,c.push(P.x,P.y,P.z),P[m]=0,P[g]=0,P[_]=T>0?1:-1,h.push(P.x,P.y,P.z),u.push(X/E),u.push(1-N/I),k+=1}}for(let N=0;N<I;N++)for(let K=0;K<E;K++){let X=d+K+O*N,H=d+K+O*(N+1),te=d+(K+1)+O*(N+1),ee=d+(K+1)+O*N;o.push(X,H,ee),o.push(H,te,ee),Y+=6}a.addGroup(f,Y,L),f+=Y,d+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new l(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Wl(l,e,t=2){let n=e&&e.length,i=n?e[0]*t:l.length,s=dc(l,0,i,t,!0),r=[];if(!s||s.next===s.prev)return r;let a,o,c;if(n&&(s=Kl(l,e,s,t)),l.length>80*t){a=l[0],o=l[1];let h=a,u=o;for(let d=t;d<i;d+=t){let f=l[d],p=l[d+1];f<a&&(a=f),p<o&&(o=p),f>h&&(h=f),p>u&&(u=p)}c=Math.max(h-a,u-o),c=c!==0?32767/c:0}return Ti(s,r,t,a,o,c,0),r}function dc(l,e,t,n,i){let s;if(i===ah(l,e,t,n)>0)for(let r=e;r<t;r+=n)s=Fo(r/n|0,l[r],l[r+1],s);else for(let r=t-n;r>=e;r-=n)s=Fo(r/n|0,l[r],l[r+1],s);return s&&Jn(s,s.next)&&(Ei(s),s=s.next),s}function wn(l,e){if(!l)return l;e||(e=l);let t=l,n;do if(n=!1,!t.steiner&&(Jn(t,t.next)||we(t.prev,t,t.next)===0)){if(Ei(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Ti(l,e,t,n,i,s,r){if(!l)return;!r&&s&&eh(l,n,i,s);let a=l;for(;l.prev!==l.next;){let o=l.prev,c=l.next;if(s?ql(l,n,i,s):Xl(l)){e.push(o.i,l.i,c.i),Ei(l),l=c.next,a=c.next;continue}if(l=c,l===a){r?r===1?(l=Yl(wn(l),e),Ti(l,e,t,n,i,s,2)):r===2&&Zl(l,e,t,n,i,s):Ti(wn(l),e,t,n,i,s,1);break}}}function Xl(l){let e=l.prev,t=l,n=l.next;if(we(e,t,n)>=0)return!1;let i=e.x,s=t.x,r=n.x,a=e.y,o=t.y,c=n.y,h=Math.min(i,s,r),u=Math.min(a,o,c),d=Math.max(i,s,r),f=Math.max(a,o,c),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&mi(i,a,s,o,r,c,p.x,p.y)&&we(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function ql(l,e,t,n){let i=l.prev,s=l,r=l.next;if(we(i,s,r)>=0)return!1;let a=i.x,o=s.x,c=r.x,h=i.y,u=s.y,d=r.y,f=Math.min(a,o,c),p=Math.min(h,u,d),m=Math.max(a,o,c),g=Math.max(h,u,d),_=Ur(f,p,e,t,n),v=Ur(m,g,e,t,n),b=l.prevZ,S=l.nextZ;for(;b&&b.z>=_&&S&&S.z<=v;){if(b.x>=f&&b.x<=m&&b.y>=p&&b.y<=g&&b!==i&&b!==r&&mi(a,h,o,u,c,d,b.x,b.y)&&we(b.prev,b,b.next)>=0||(b=b.prevZ,S.x>=f&&S.x<=m&&S.y>=p&&S.y<=g&&S!==i&&S!==r&&mi(a,h,o,u,c,d,S.x,S.y)&&we(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;b&&b.z>=_;){if(b.x>=f&&b.x<=m&&b.y>=p&&b.y<=g&&b!==i&&b!==r&&mi(a,h,o,u,c,d,b.x,b.y)&&we(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;S&&S.z<=v;){if(S.x>=f&&S.x<=m&&S.y>=p&&S.y<=g&&S!==i&&S!==r&&mi(a,h,o,u,c,d,S.x,S.y)&&we(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Yl(l,e){let t=l;do{let n=t.prev,i=t.next.next;!Jn(n,i)&&pc(n,t,t.next,i)&&Ai(n,i)&&Ai(i,n)&&(e.push(n.i,t.i,i.i),Ei(t),Ei(t.next),t=l=i),t=t.next}while(t!==l);return wn(t)}function Zl(l,e,t,n,i,s){let r=l;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&ih(r,a)){let o=mc(r,a);r=wn(r,r.next),o=wn(o,o.next),Ti(r,e,t,n,i,s,0),Ti(o,e,t,n,i,s,0);return}a=a.next}r=r.next}while(r!==l)}function Kl(l,e,t,n){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s]*n,o=s<r-1?e[s+1]*n:l.length,c=dc(l,a,o,n,!1);c===c.next&&(c.steiner=!0),i.push(nh(c))}i.sort(jl);for(let s=0;s<i.length;s++)t=Jl(i[s],t);return t}function jl(l,e){let t=l.x-e.x;if(t===0&&(t=l.y-e.y,t===0)){let n=(l.next.y-l.y)/(l.next.x-l.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Jl(l,e){let t=$l(l,e);if(!t)return e;let n=mc(t,l);return wn(n,n.next),wn(t,t.next)}function $l(l,e){let t=e,n=l.x,i=l.y,s=-1/0,r;if(Jn(l,t))return t;do{if(Jn(l,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>s&&(s=u,r=t.x<t.next.x?t:t.next,u===n))return r}t=t.next}while(t!==e);if(!r)return null;let a=r,o=r.x,c=r.y,h=1/0;t=r;do{if(n>=t.x&&t.x>=o&&n!==t.x&&fc(i<c?n:s,i,o,c,i<c?s:n,i,t.x,t.y)){let u=Math.abs(i-t.y)/(n-t.x);Ai(t,l)&&(u<h||u===h&&(t.x>r.x||t.x===r.x&&Ql(r,t)))&&(r=t,h=u)}t=t.next}while(t!==a);return r}function Ql(l,e){return we(l.prev,l,e.prev)<0&&we(e.next,l,l.next)<0}function eh(l,e,t,n){let i=l;do i.z===0&&(i.z=Ur(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==l);i.prevZ.nextZ=null,i.prevZ=null,th(i)}function th(l){let e,t=1;do{let n=l,i;l=null;let s=null;for(e=0;n;){e++;let r=n,a=0;for(let c=0;c<t&&(a++,r=r.nextZ,!!r);c++);let o=t;for(;a>0||o>0&&r;)a!==0&&(o===0||!r||n.z<=r.z)?(i=n,n=n.nextZ,a--):(i=r,r=r.nextZ,o--),s?s.nextZ=i:l=i,i.prevZ=s,s=i;n=r}s.nextZ=null,t*=2}while(e>1);return l}function Ur(l,e,t,n,i){return l=(l-t)*i|0,e=(e-n)*i|0,l=(l|l<<8)&16711935,l=(l|l<<4)&252645135,l=(l|l<<2)&858993459,l=(l|l<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,l|e<<1}function nh(l){let e=l,t=l;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==l);return t}function fc(l,e,t,n,i,s,r,a){return(i-r)*(e-a)>=(l-r)*(s-a)&&(l-r)*(n-a)>=(t-r)*(e-a)&&(t-r)*(s-a)>=(i-r)*(n-a)}function mi(l,e,t,n,i,s,r,a){return!(l===r&&e===a)&&fc(l,e,t,n,i,s,r,a)}function ih(l,e){return l.next.i!==e.i&&l.prev.i!==e.i&&!sh(l,e)&&(Ai(l,e)&&Ai(e,l)&&rh(l,e)&&(we(l.prev,l,e.prev)||we(l,e.prev,e))||Jn(l,e)&&we(l.prev,l,l.next)>0&&we(e.prev,e,e.next)>0)}function we(l,e,t){return(e.y-l.y)*(t.x-e.x)-(e.x-l.x)*(t.y-e.y)}function Jn(l,e){return l.x===e.x&&l.y===e.y}function pc(l,e,t,n){let i=gs(we(l,e,t)),s=gs(we(l,e,n)),r=gs(we(t,n,l)),a=gs(we(t,n,e));return!!(i!==s&&r!==a||i===0&&ms(l,t,e)||s===0&&ms(l,n,e)||r===0&&ms(t,l,n)||a===0&&ms(t,e,n))}function ms(l,e,t){return e.x<=Math.max(l.x,t.x)&&e.x>=Math.min(l.x,t.x)&&e.y<=Math.max(l.y,t.y)&&e.y>=Math.min(l.y,t.y)}function gs(l){return l>0?1:l<0?-1:0}function sh(l,e){let t=l;do{if(t.i!==l.i&&t.next.i!==l.i&&t.i!==e.i&&t.next.i!==e.i&&pc(t,t.next,l,e))return!0;t=t.next}while(t!==l);return!1}function Ai(l,e){return we(l.prev,l,l.next)<0?we(l,e,l.next)>=0&&we(l,l.prev,e)>=0:we(l,e,l.prev)<0||we(l,l.next,e)<0}function rh(l,e){let t=l,n=!1,i=(l.x+e.x)/2,s=(l.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==l);return n}function mc(l,e){let t=Or(l.i,l.x,l.y),n=Or(e.i,e.x,e.y),i=l.next,s=e.prev;return l.next=e,e.prev=l,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Fo(l,e,t,n){let i=Or(l,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ei(l){l.next.prev=l.prev,l.prev.next=l.next,l.prevZ&&(l.prevZ.nextZ=l.nextZ),l.nextZ&&(l.nextZ.prevZ=l.prevZ)}function Or(l,e,t){return{i:l,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function ah(l,e,t,n){let i=0;for(let s=e,r=t-n;s<t;s+=n)i+=(l[r]-l[s])*(l[s+1]+l[r+1]),r=s;return i}var Fr=class{static triangulate(e,t,n=2){return Wl(e,t,n)}},$n=class l{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return l.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];Bo(e),ko(n,e);let r=e.length;t.forEach(Bo);for(let o=0;o<t.length;o++)i.push(r),r+=t[o].length,ko(n,t[o]);let a=Fr.triangulate(n,i);for(let o=0;o<a.length;o+=3)s.push(a.slice(o,o+3));return s}};function Bo(l){let e=l.length;e>2&&l[e-1].equals(l[0])&&l.pop()}function ko(l,e){for(let t=0;t<e.length;t++)l.push(e[t].x),l.push(e[t].y)}function gc(l){let e={};for(let t in l){e[t]={};for(let n in l[t]){let i=l[t][n];if(zo(i))i.isRenderTargetTexture?(ye("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(zo(i[0])){let s=[];for(let r=0,a=i.length;r<a;r++)s[r]=i[r].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Ze(l){let e={};for(let t=0;t<l.length;t++){let n=gc(l[t]);for(let i in n)e[i]=n[i]}return e}function zo(l){return l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)}var ut=class extends Ve{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fs,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ye=class extends ut{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new pe(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ue(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new ae(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ae(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ae(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Wn('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Wn('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},ln=class extends Ve{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ae(16777215),this.specular=new ae(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fs,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yt,this.combine=Di,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Ri=class extends Ve{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fs,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yt,this.combine=Di,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function nn(l,e){return!l||l.constructor===e?l:typeof e.BYTES_PER_ELEMENT=="number"?new e(l):Array.prototype.slice.call(l)}function gi(l){return l!==void 0&&l.inTangents!==void 0&&l.outTangents!==void 0}function oh(l){function e(i,s){return l[i]-l[s]}let t=l.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Go(l,e,t){let n=l.length,i=new l.constructor(n);for(let s=0,r=0;r!==n;++s){let a=t[s]*e;for(let o=0;o!==e;++o)i[r++]=l[a+o]}return i}function ch(l,e,t,n){let i=1,s=l[0];for(;s!==void 0&&s[n]===void 0;)s=l[i++];if(s===void 0)return;let r=s[n];if(r!==void 0)if(Array.isArray(r))do r=s[n],r!==void 0&&(e.push(s.time),t.push(...r)),s=l[i++];while(s!==void 0);else if(r.toArray!==void 0)do r=s[n],r!==void 0&&(e.push(s.time),r.toArray(t,t.length)),s=l[i++];while(s!==void 0);else do r=s[n],r!==void 0&&(e.push(s.time),t.push(r)),s=l[i++];while(s!==void 0)}var Ct=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let r;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}r=t.length;break n}if(!(e>=s)){let a=t[1];e<a&&(n=2,s=a);for(let o=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===o)break;if(i=s,s=t[--n-1],e>=s)break t}r=n,n=0;break n}break e}for(;n<r;){let a=n+r>>>1;e<t[a]?r=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let r=0;r!==i;++r)t[r]=n[s+r];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Is=class extends Ct{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Cr,endingEnd:Cr}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,r=e+1,a=i[s],o=i[r];if(a===void 0)switch(this.getSettings_().endingStart){case Ir:s=e,a=2*t-n;break;case Pr:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(o===void 0)switch(this.getSettings_().endingEnd){case Ir:r=e,o=2*n-t;break;case Pr:r=1,o=n+i[1]-i[0];break;default:r=e-1,o=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(o-n),this._offsetPrev=s*h,this._offsetNext=r*h}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=e*a,c=o-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),m=p*p,g=m*p,_=-d*g+2*d*m-d*p,v=(1+d)*g+(-1.5-2*d)*m+(-.5+d)*p+1,b=(-1-f)*g+(1.5+f)*m+.5*p,S=f*g-f*m;for(let w=0;w!==a;++w)s[w]=_*r[h+w]+v*r[c+w]+b*r[o+w]+S*r[u+w];return s}},Ps=class extends Ct{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=e*a,c=o-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)s[d]=r[c+d]*u+r[o+d]*h;return s}},Ns=class extends Ct{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Ls=class extends Ct{interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=e*a,c=o-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-t)/(i-t),m=1-p;for(let g=0;g!==a;++g)s[g]=r[c+g]*m+r[o+g]*p;return s}let d=a*2,f=e-1;for(let p=0;p!==a;++p){let m=r[c+p],g=r[o+p],_=f*d+p*2,v=u[_],b=u[_+1],S=e*d+p*2,w=h[S],T=h[S+1],E=hh(n,t,v,w,i);s[p]=_c(E,m,b,T,g)}return s}};function _c(l,e,t,n,i){let s=1-l;return s*s*s*e+3*s*s*l*t+3*s*l*l*n+l*l*l*i}function lh(l,e,t,n,i){let s=1-l;return 3*s*s*(t-e)+6*s*l*(n-t)+3*l*l*(i-n)}function hh(l,e,t,n,i){let s=(l-e)/(i-e);for(let r=0;r<8;r++){let a=_c(s,e,t,n,i)-l;if(Math.abs(a)<1e-10)break;let o=lh(s,e,t,n,i);if(Math.abs(o)<1e-10)break;s=Math.max(0,Math.min(1,s-a/o))}return s}var Je=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=nn(t,this.TimeBufferType),this.values=nn(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:nn(e.times,Array),values:nn(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),gi(e.settings)&&(n.settings={inTangents:nn(e.settings.inTangents,Array),outTangents:nn(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ns(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ps(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Is(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ls(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case xt:t=this.InterpolantFactoryMethodDiscrete;break;case Vt:t=this.InterpolantFactoryMethodLinear;break;case ys:t=this.InterpolantFactoryMethodSmooth;break;case yi:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return ye("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xt;case this.InterpolantFactoryMethodLinear:return Vt;case this.InterpolantFactoryMethodSmooth:return ys;case this.InterpolantFactoryMethodBezier:return yi}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e;gi(this.settings)&&(Ho(this.settings.inTangents,e),Ho(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;gi(this.settings)&&(Vo(this.settings.inTangents,e),Vo(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,s=0,r=i-1;for(;s!==i&&n[s]<e;)++s;for(;r!==-1&&n[r]>t;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);let a=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*a,r*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Me("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(Me("KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let a=0;a!==s;a++){let o=n[a];if(typeof o=="number"&&isNaN(o)){Me("KeyframeTrack: Time is not a valid number.",this,a,o),e=!1;break}if(r!==null&&r>o){Me("KeyframeTrack: Out of order keys.",this,a,o,r),e=!1;break}r=o}if(i!==void 0&&ol(i))for(let a=0,o=i.length;a!==o;++a){let c=i[a];if(isNaN(c)){Me("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ys,s=e.length-1,r=1;for(let a=1;a<s;++a){let o=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)o=!0;else{let u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){let m=t[u+p];if(m!==t[d+p]||m!==t[f+p]){o=!0;break}}}if(o){if(a!==r){e[r]=e[a];let u=a*n,d=r*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++r}}if(s>0){e[r]=e[s];for(let a=s*n,o=r*n,c=0;c!==n;++c)t[o+c]=t[a+c];++r}return r!==e.length?(this.times=e.slice(0,r),this.values=t.slice(0,r*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,gi(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Ho(l,e){for(let t=0,n=l.length;t!==n;t+=2)l[t]+=e}function Vo(l,e){for(let t=0,n=l.length;t!==n;t+=2)l[t]*=e}Je.prototype.ValueTypeName="";Je.prototype.TimeBufferType=Float32Array;Je.prototype.ValueBufferType=Float32Array;Je.prototype.DefaultInterpolation=Vt;var Yt=class extends Je{constructor(e,t,n){super(e,t,n)}};Yt.prototype.ValueTypeName="bool";Yt.prototype.ValueBufferType=Array;Yt.prototype.DefaultInterpolation=xt;Yt.prototype.InterpolantFactoryMethodLinear=void 0;Yt.prototype.InterpolantFactoryMethodSmooth=void 0;var Ci=class extends Je{constructor(e,t,n,i){super(e,t,n,i)}};Ci.prototype.ValueTypeName="color";var Zt=class extends Je{constructor(e,t,n,i){super(e,t,n,i)}};Zt.prototype.ValueTypeName="number";var Ds=class extends Ct{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)Ee.slerpFlat(s,0,r,c-a,r,c,o);return s}},rt=class extends Je{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Ds(this.times,this.values,this.getValueSize(),e)}};rt.prototype.ValueTypeName="quaternion";rt.prototype.InterpolantFactoryMethodSmooth=void 0;var Kt=class extends Je{constructor(e,t,n){super(e,t,n)}};Kt.prototype.ValueTypeName="string";Kt.prototype.ValueBufferType=Array;Kt.prototype.DefaultInterpolation=xt;Kt.prototype.InterpolantFactoryMethodLinear=void 0;Kt.prototype.InterpolantFactoryMethodSmooth=void 0;var Le=class extends Je{constructor(e,t,n,i){super(e,t,n,i)}};Le.prototype.ValueTypeName="vector";var hn=class{constructor(e="",t=-1,n=[],i=oc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Lt(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let r=0,a=n.length;r!==a;++r)t.push(dh(n[r]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,r=n.length;s!==r;++s)t.push(Je.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,r=[];for(let a=0;a<s;a++){let o=[],c=[];o.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);let h=oh(o);o=Go(o,1,h),c=Go(c,1,h),!i&&o[0]===0&&(o.push(s),c.push(c[0])),r.push(new Zt(".morphTargetInfluences["+t[a].name+"]",o,c).scale(1/n))}return new this(e,-1,r)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,o=e.length;a<o;a++){let c=e[a],h=c.name.match(s);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let r=[];for(let a in i)r.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return r}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function uh(l){switch(l.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Zt;case"vector":case"vector2":case"vector3":case"vector4":return Le;case"color":return Ci;case"quaternion":return rt;case"bool":case"boolean":return Yt;case"string":return Kt}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+l)}function dh(l){if(l.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=uh(l.type);if(l.times===void 0){let n=[],i=[];ch(l.keys,n,i,"value"),l.times=n,l.values=i}let t;return e.parse!==void 0?t=e.parse(l):t=new e(l.name,l.times,l.values,l.interpolation),gi(l.settings)&&(t.settings={inTangents:nn(l.settings.inTangents,Float32Array),outTangents:nn(l.settings.outTangents,Float32Array)}),t}var At={enabled:!1,files:{},add:function(l,e){this.enabled!==!1&&(Wo(l)||(this.files[l]=e))},get:function(l){if(this.enabled!==!1&&!Wo(l))return this.files[l]},remove:function(l){delete this.files[l]},clear:function(){this.files={}}};function Wo(l){try{let e=l.slice(l.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Qn=class{constructor(e,t,n){let i=this,s=!1,r=0,a=0,o,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,r,a),s=!0},this.itemEnd=function(h){r++,i.onProgress!==void 0&&i.onProgress(h,r,a),r===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),o?o(h):h},this.setURLModifier=function(h){return o=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},xc=new Qn,De=class{constructor(e){this.manager=e!==void 0?e:xc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};De.DEFAULT_MATERIAL_NAME="__DEFAULT";var Gt={},Br=class extends Error{constructor(e,t){super(e),this.response=t}},at=class extends De{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=At.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(Gt[e]!==void 0){Gt[e].push({onLoad:t,onProgress:n,onError:i});return}Gt[e]=[],Gt[e].push({onLoad:t,onProgress:n,onError:i});let r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,o=this.responseType;fetch(r).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&ye("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Gt[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0,m=0,g=new ReadableStream({start(_){v();function v(){u.read().then(({done:b,value:S})=>{if(b)_.close();else{m+=S.byteLength;let w=new ProgressEvent("progress",{lengthComputable:p,loaded:m,total:f});for(let T=0,E=h.length;T<E;T++){let I=h[T];I.onProgress&&I.onProgress(w)}_.enqueue(S),v()}},b=>{_.error(b)})}}});return new Response(g)}else throw new Br(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(o){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{At.add(`file:${e}`,c);let h=Gt[e];delete Gt[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=Gt[e];if(h===void 0)throw this.manager.itemError(e),c;delete Gt[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Vn=new WeakMap,Us=class extends De{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,r=At.get(`image:${e}`);if(r!==void 0){if(r.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0);else{let u=Vn.get(r);u===void 0&&(u=[],Vn.set(r,u)),u.push({onLoad:t,onError:i})}return r}let a=Ms("img");function o(){h(),t&&t(this);let u=Vn.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}Vn.delete(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),At.remove(`image:${e}`);let d=Vn.get(this)||[];for(let f=0;f<d.length;f++){let p=d[f];p.onError&&p.onError(u)}Vn.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",o,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",o,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),At.add(`image:${e}`,a),s.manager.itemStart(e),a.fetchPriority=this.priority,a.src=e,a}};var Ii=class extends De{constructor(e){super(e)}load(e,t,n,i){let s=this,r=new Sn,a=new at(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(e,function(o){let c;try{c=s.parse(o)}catch(h){i!==void 0?i(h):Me(h);return}s._applyTexData(r,c),t&&t(r,c)},n,i),r}createDataTexture(e){let t=new Sn;return this._applyTexData(t,this.parse(e)),t}_applyTexData(e,t){t.image!==void 0?e.image=t.image:t.data!==void 0&&(e.image.width=t.width,e.image.height=t.height,e.image.data=t.data),e.wrapS=t.wrapS!==void 0?t.wrapS:Ke,e.wrapT=t.wrapT!==void 0?t.wrapT:Ke,e.magFilter=t.magFilter!==void 0?t.magFilter:_t,e.minFilter=t.minFilter!==void 0?t.minFilter:_t,e.anisotropy=t.anisotropy!==void 0?t.anisotropy:1,t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.mipmaps!==void 0&&(e.mipmaps=t.mipmaps,e.minFilter=Nt),t.mipmapCount===1&&(e.minFilter=_t),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),e.needsUpdate=!0}},Tn=class extends De{constructor(e){super(e)}load(e,t,n,i){let s=new nt,r=new Us(this.manager);return r.setPriority(this.priority),r.setCache(this.cache),r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},An=class extends Re{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ae(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var yr=new se,Xo=new U,qo=new U,ei=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pe(512,512),this.mapType=$r,this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Es,this._frameExtents=new pe(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Xo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Xo),qo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(qo),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){yr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(yr,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,r=i?i.z/s.x:1,a=i?i.w/s.y:1,o=i?i.x/s.x:0,c=i?i.y/s.y:0;e.coordinateSystem===vi||e.reversedDepth?t.set(.5*r,0,0,.5*r+o,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*r,0,0,.5*r+o,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(yr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},_s=new U,xs=new Ee,Mt=new U,Pi=class extends Re{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(_s,xs,Mt),Mt.x===1&&Mt.y===1&&Mt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_s,xs,Mt.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(_s,xs,Mt),Mt.x===1&&Mt.y===1&&Mt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_s,xs,Mt.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},tn=new U,Yo=new pe,Zo=new pe,It=class extends Pi{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Yn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(_i*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yn*2*Math.atan(Math.tan(_i*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){tn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(tn.x,tn.y).multiplyScalar(-e/tn.z),tn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(tn.x,tn.y).multiplyScalar(-e/tn.z)}getViewSize(e,t){return this.getViewBounds(e,Yo,Zo),t.subVectors(Zo,Yo)}setViewOffset(e,t,n,i,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(_i*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,r=this.view;if(this.view!==null&&this.view.enabled){let o=r.fullWidth,c=r.fullHeight;s+=r.offsetX*i/o,t-=r.offsetY*n/c,i*=r.width/o,n*=r.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},kr=class extends ei{constructor(){super(new It(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Yn*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},En=class extends An{constructor(e,t,n=0,i=Math.PI/3,s=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Re.DEFAULT_UP),this.updateMatrix(),this.target=new Re,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new kr}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},zr=class extends ei{constructor(){super(new It(90,1,.5,500)),this.isPointLightShadow=!0}},Rn=class extends An{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new zr}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},un=class extends Pi{constructor(e=-1,t=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,r=n+e,a=i+t,o=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,a-=h*this.view.offsetY,o=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,a,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Gr=class extends ei{constructor(){super(new un(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Cn=class extends An{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Re.DEFAULT_UP),this.updateMatrix(),this.target=new Re,this.shadow=new Gr}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Ni=class extends An{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var bt=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var vr=new WeakMap,Li=class extends De{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&ye("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&ye("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,r=At.get(`image-bitmap:${e}`);if(r!==void 0){if(s.manager.itemStart(e),r.then){r.then(c=>{vr.has(r)===!0?(i&&i(vr.get(r)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(c),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0);return}let a={};a.credentials=this.withCredentials||this.crossOrigin!=="anonymous"?"include":"same-origin",a.headers=this.requestHeader,a.priority=this.priority,a.cache=this.cache,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let o=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},s.options,{colorSpaceConversion:"none"}))}).then(function(c){return At.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),vr.set(o,c),At.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});At.add(`image-bitmap:${e}`,o),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var sa="\\[\\]\\.:\\/",fh=new RegExp("["+sa+"]","g"),ra="[^"+sa+"]",ph="[^"+sa.replace("\\.","")+"]",mh=/((?:WC+[\/:])*)/.source.replace("WC",ra),gh=/(WCOD+)?/.source.replace("WCOD",ph),_h=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ra),xh=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ra),yh=new RegExp("^"+mh+gh+_h+xh+"$"),vh=["material","materials","bones","map"],Hr=class{constructor(e,t,n){let i=n||_e.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},_e=class l{constructor(e,t,n){this.path=t,this.parsedPath=n||l.parseTrackName(t),this.node=l.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new l.Composite(e,t,n):new l(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(fh,"")}static parseTrackName(e){let t=yh.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);vh.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let r=0;r<s.length;r++){let a=s[r];if(a.name===t||a.uuid===t)return a;let o=n(a.children);if(o)return o}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=l.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){ye("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Me("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Me("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Me("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Me("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Me("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Me("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Me("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let r=e[i];if(r===void 0){let c=t.nodeName;Me("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let o=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Me("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Me("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}o=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(o=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(o=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_e.Composite=Hr;_e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_e.prototype.GetterByBindingType=[_e.prototype._getValue_direct,_e.prototype._getValue_array,_e.prototype._getValue_arrayElement,_e.prototype._getValue_toArray];_e.prototype.SetterByBindingTypeAndVersioning=[[_e.prototype._setValue_direct,_e.prototype._setValue_direct_setNeedsUpdate,_e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_array,_e.prototype._setValue_array_setNeedsUpdate,_e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_arrayElement,_e.prototype._setValue_arrayElement_setNeedsUpdate,_e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_fromArray,_e.prototype._setValue_fromArray_setNeedsUpdate,_e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Lf=new Float32Array(1);var Vr=class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?ye("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");var bh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Mh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Th=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ah=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Eh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Rh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ch=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Ih=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ph=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Lh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Dh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Uh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Oh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Fh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Gh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Hh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Vh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Wh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Xh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,qh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$h=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Qh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,eu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,tu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,iu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,su=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ru=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,au=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ou=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,uu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,du=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,fu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_u=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,xu=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bu=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Su=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Mu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Au=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Eu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ru=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Iu=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Lu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Du=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Uu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ou=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Fu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ku=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,zu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Vu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Wu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ku=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,ju=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ju=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$u=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ed=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,td=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,id=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,sd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,rd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ad=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,od=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,cd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ld=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ud=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,pd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,md=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,gd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_d=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,yd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,vd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Md=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Td=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ad=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ed=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Rd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Cd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Id=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ld=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ud=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Od=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fd=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bd=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,kd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Gd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Hd=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vd=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wd=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Xd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zd=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Kd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jd=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jd=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$d=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,me={alphahash_fragment:bh,alphahash_pars_fragment:Sh,alphamap_fragment:Mh,alphamap_pars_fragment:wh,alphatest_fragment:Th,alphatest_pars_fragment:Ah,aomap_fragment:Eh,aomap_pars_fragment:Rh,batching_pars_vertex:Ch,batching_vertex:Ih,begin_vertex:Ph,beginnormal_vertex:Nh,bsdfs:Lh,iridescence_fragment:Dh,bumpmap_pars_fragment:Uh,clipping_planes_fragment:Oh,clipping_planes_pars_fragment:Fh,clipping_planes_pars_vertex:Bh,clipping_planes_vertex:kh,color_fragment:zh,color_pars_fragment:Gh,color_pars_vertex:Hh,color_vertex:Vh,common:Wh,defaultnormal_vertex:Xh,displacementmap_pars_vertex:qh,displacementmap_vertex:Yh,emissivemap_fragment:Zh,emissivemap_pars_fragment:Kh,colorspace_fragment:jh,colorspace_pars_fragment:Jh,envmap_fragment:$h,envmap_common_pars_fragment:Qh,envmap_pars_fragment:eu,envmap_pars_vertex:tu,envmap_physical_pars_fragment:du,envmap_vertex:nu,fog_vertex:iu,fog_pars_vertex:su,fog_fragment:ru,fog_pars_fragment:au,gradientmap_pars_fragment:ou,lightmap_pars_fragment:cu,lights_lambert_fragment:lu,lights_lambert_pars_fragment:hu,lights_pars_begin:uu,lights_toon_fragment:fu,lights_toon_pars_fragment:pu,lights_phong_fragment:mu,lights_phong_pars_fragment:gu,lights_physical_fragment:_u,lights_physical_pars_fragment:xu,lights_fragment_begin:yu,lights_fragment_maps:vu,lights_fragment_end:bu,lightprobes_pars_fragment:Su,logdepthbuf_fragment:Mu,logdepthbuf_pars_fragment:wu,logdepthbuf_pars_vertex:Tu,logdepthbuf_vertex:Au,map_fragment:Eu,map_pars_fragment:Ru,map_particle_fragment:Cu,map_particle_pars_fragment:Iu,metalnessmap_fragment:Pu,metalnessmap_pars_fragment:Nu,morphinstance_vertex:Lu,morphcolor_vertex:Du,morphnormal_vertex:Uu,morphtarget_pars_vertex:Ou,morphtarget_vertex:Fu,normal_fragment_begin:Bu,normal_fragment_maps:ku,normal_pars_fragment:zu,normal_pars_vertex:Gu,normal_vertex:Hu,normalmap_pars_fragment:Vu,clearcoat_normal_fragment_begin:Wu,clearcoat_normal_fragment_maps:Xu,clearcoat_pars_fragment:qu,iridescence_pars_fragment:Yu,opaque_fragment:Zu,packing:Ku,premultiplied_alpha_fragment:ju,project_vertex:Ju,dithering_fragment:$u,dithering_pars_fragment:Qu,roughnessmap_fragment:ed,roughnessmap_pars_fragment:td,shadowmap_pars_fragment:nd,shadowmap_pars_vertex:id,shadowmap_vertex:sd,shadowmask_pars_fragment:rd,skinbase_vertex:ad,skinning_pars_vertex:od,skinning_vertex:cd,skinnormal_vertex:ld,specularmap_fragment:hd,specularmap_pars_fragment:ud,tonemapping_fragment:dd,tonemapping_pars_fragment:fd,transmission_fragment:pd,transmission_pars_fragment:md,uv_pars_fragment:gd,uv_pars_vertex:_d,uv_vertex:xd,worldpos_vertex:yd,background_vert:vd,background_frag:bd,backgroundCube_vert:Sd,backgroundCube_frag:Md,cube_vert:wd,cube_frag:Td,depth_vert:Ad,depth_frag:Ed,distance_vert:Rd,distance_frag:Cd,equirect_vert:Id,equirect_frag:Pd,linedashed_vert:Nd,linedashed_frag:Ld,meshbasic_vert:Dd,meshbasic_frag:Ud,meshlambert_vert:Od,meshlambert_frag:Fd,meshmatcap_vert:Bd,meshmatcap_frag:kd,meshnormal_vert:zd,meshnormal_frag:Gd,meshphong_vert:Hd,meshphong_frag:Vd,meshphysical_vert:Wd,meshphysical_frag:Xd,meshtoon_vert:qd,meshtoon_frag:Yd,points_vert:Zd,points_frag:Kd,shadow_vert:jd,shadow_frag:Jd,sprite_vert:$d,sprite_frag:Qd},ne={common:{diffuse:{value:new ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new ae(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},yc={basic:{uniforms:Ze([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:me.meshbasic_vert,fragmentShader:me.meshbasic_frag},lambert:{uniforms:Ze([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new ae(0)},envMapIntensity:{value:1}}]),vertexShader:me.meshlambert_vert,fragmentShader:me.meshlambert_frag},phong:{uniforms:Ze([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new ae(0)},specular:{value:new ae(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:me.meshphong_vert,fragmentShader:me.meshphong_frag},standard:{uniforms:Ze([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:me.meshphysical_vert,fragmentShader:me.meshphysical_frag},toon:{uniforms:Ze([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new ae(0)}}]),vertexShader:me.meshtoon_vert,fragmentShader:me.meshtoon_frag},matcap:{uniforms:Ze([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:me.meshmatcap_vert,fragmentShader:me.meshmatcap_frag},points:{uniforms:Ze([ne.points,ne.fog]),vertexShader:me.points_vert,fragmentShader:me.points_frag},dashed:{uniforms:Ze([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:me.linedashed_vert,fragmentShader:me.linedashed_frag},depth:{uniforms:Ze([ne.common,ne.displacementmap]),vertexShader:me.depth_vert,fragmentShader:me.depth_frag},normal:{uniforms:Ze([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:me.meshnormal_vert,fragmentShader:me.meshnormal_frag},sprite:{uniforms:Ze([ne.sprite,ne.fog]),vertexShader:me.sprite_vert,fragmentShader:me.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:me.background_vert,fragmentShader:me.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:me.backgroundCube_vert,fragmentShader:me.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:me.cube_vert,fragmentShader:me.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:me.equirect_vert,fragmentShader:me.equirect_frag},distance:{uniforms:Ze([ne.common,ne.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:me.distance_vert,fragmentShader:me.distance_frag},shadow:{uniforms:Ze([ne.lights,ne.fog,{color:{value:new ae(0)},opacity:{value:1}}]),vertexShader:me.shadow_vert,fragmentShader:me.shadow_frag}};yc.physical={uniforms:Ze([yc.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new ce},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new ae(0)},specularColor:{value:new ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:me.meshphysical_vert,fragmentShader:me.meshphysical_frag};var ef=new ce;ef.set(-1,0,0,0,1,0,0,0,1);var X_={[Wr]:"LINEAR_TONE_MAPPING",[Xr]:"REINHARD_TONE_MAPPING",[qr]:"CINEON_TONE_MAPPING",[Yr]:"ACES_FILMIC_TONE_MAPPING",[Kr]:"AGX_TONE_MAPPING",[jr]:"NEUTRAL_TONE_MAPPING",[Zr]:"CUSTOM_TONE_MAPPING"};var q_=new Float32Array(16),Y_=new Float32Array(9),Z_=new Float32Array(4);var K_={[Wr]:"Linear",[Xr]:"Reinhard",[qr]:"Cineon",[Yr]:"ACESFilmic",[Kr]:"AgX",[jr]:"Neutral",[Zr]:"Custom"};var j_={[Ko]:"SHADOWMAP_TYPE_PCF",[jo]:"SHADOWMAP_TYPE_VSM"};var J_={[rc]:"ENVMAP_MODE_REFRACTION"};var $_={[Di]:"ENVMAP_BLENDING_MULTIPLY",[nc]:"ENVMAP_BLENDING_MIX",[ic]:"ENVMAP_BLENDING_ADD"};var tf=new ce;tf.set(-1,0,0,0,1,0,0,0,1);var Q_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);function Mc(l,e=!1){let t=l[0].index!==null,n=new Set(Object.keys(l[0].attributes)),i=new Set(Object.keys(l[0].morphAttributes)),s={},r={},a=l[0].morphTargetsRelative,o=new Te;o.morphTargetsRelative=a;let c=0;for(let h=0;h<l.length;++h){let u=l[h],d=0,f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(u.attributes[p]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in u.morphAttributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(u.morphAttributes[p].length!==l[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.morphAttributes[p]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;o.addGroup(c,p,h),c+=p}}if(t){let h=0,u=[];for(let d=0;d<l.length;++d){let f=l[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=l[d].attributes.position.count}o.setIndex(u)}for(let h in s){let u=bc(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;o.setAttribute(h,u)}for(let h in r){let u=r[h][0].length;if(u!==0){o.morphAttributes=o.morphAttributes||{},o.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let m=0;m<r[h].length;++m)f.push(r[h][m][d]);let p=bc(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;o.morphAttributes[h].push(p)}}}return o}function bc(l){let e,t,n,i=-1,s=0;for(let c=0;c<l.length;++c){let h=l[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*t}let r=new e(s),a=new xe(r,t,n),o=0;for(let c=0;c<l.length;++c){let h=l[c];if(h.isInterleavedBufferAttribute){let u=o/t;for(let d=0,f=h.count;d<f;d++)for(let p=0;p<t;p++){let m=h.getComponent(d,p);a.setComponent(d+u,p,m)}}else r.set(h.array,o);o+=h.count*t}return i!==void 0&&(a.gpuType=i),a}function wc(l,e=1e-4){e=Math.max(e,Number.EPSILON);let t={},n=l.getIndex(),i=l.getAttribute("position"),s=n?n.count:i.count,r=0,a=Object.keys(l.attributes),o=[],c=new Map,h=[],u=["getX","getY","getZ","getW"],d=e*.5,f=Math.log10(1/e),p=Math.pow(10,f),m=d*p;for(let _=0;_<s;_++){let v=n?n.getX(_):_,b="";for(let S=0,w=a.length;S<w;S++){let T=a[S],E=l.getAttribute(T),I=E.itemSize;for(let L=0;L<I;L++)b+=`${Math.trunc(E[u[L]](v)*p+m)},`}b in t?h.push(t[b]):(o.push(v),t[b]=r,h.push(r),r++)}let g=l.clone();for(let _ in l.attributes)g.setAttribute(_,Sc(l.attributes[_],o,c));for(let _ in l.morphAttributes)g.morphAttributes[_]=l.morphAttributes[_].map(v=>Sc(v,o,c));return g.setIndex(h),g}function aa(l,e){if(e===Qr)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),l;if(e===ti||e===ki){let t=l.getIndex();if(t===null){let s=[],r=l.getAttribute("position");if(r!==void 0){for(let a=0;a<r.count;a++)s.push(a);l.setIndex(s),t=l.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),l}let n=t.count-2,i=[];if(e===ti)for(let s=1;s<=n;s++)i.push(t.getX(0)),i.push(t.getX(s)),i.push(t.getX(s+1));else for(let s=0;s<n;s++)s%2===0?(i.push(t.getX(s)),i.push(t.getX(s+1)),i.push(t.getX(s+2))):(i.push(t.getX(s+2)),i.push(t.getX(s+1)),i.push(t.getX(s)));return i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),l.setIndex(i),l.clearGroups(),l}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),l}function Sc(l,e,t=new Map){let n=l.isInterleavedBufferAttribute,i=n?l.data:l,s=n?i.stride:l.itemSize,r=n?t.get(i):void 0;if(r===void 0){let o=new i.array.constructor(e.length*s);for(let c=0;c<e.length;c++)for(let h=0;h<s;h++)o[c*s+h]=i.array[e[c]*s+h];r=n?new i.constructor(o,s,i.meshPerAttribute):new l.constructor(o,l.itemSize,l.normalized,l.meshPerAttribute),r.setUsage(i.usage),n&&t.set(i,r)}let a=n?new l.constructor(r,l.itemSize,l.offset,l.normalized):r;return a.name=l.name,n||(a.gpuType=l.gpuType),a}function Tc(l){let e=new Map,t=new Map,n=l.clone();return Ac(l,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let s=i,r=e.get(i),a=r.skeleton.bones;s.skeleton=r.skeleton.clone(),s.bindMatrix.copy(r.bindMatrix),s.skeleton.bones=a.map(function(o){return t.get(o)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Ac(l,e,t){t(l,e);for(let n=0;n<l.children.length;n++)Ac(l.children[n],e.children[n],t)}var ks=class extends De{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new fa(t)}),this.register(function(t){return new pa(t)}),this.register(function(t){return new ma(t)}),this.register(function(t){return new wa(t)}),this.register(function(t){return new Ta(t)}),this.register(function(t){return new Aa(t)}),this.register(function(t){return new _a(t)}),this.register(function(t){return new xa(t)}),this.register(function(t){return new ya(t)}),this.register(function(t){return new va(t)}),this.register(function(t){return new da(t)}),this.register(function(t){return new ba(t)}),this.register(function(t){return new ga(t)}),this.register(function(t){return new Ma(t)}),this.register(function(t){return new Sa(t)}),this.register(function(t){return new ha(t)}),this.register(function(t){return new zs(t,le.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new zs(t,le.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Ea(t)})}load(e,t,n,i){let s=this,r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){let c=bt.extractUrlBase(e);r=bt.resolveURL(c,this.path)}else r=bt.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},o=new at(this.manager);o.setPriority(this.priority),o.setCache(this.cache),o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(c){try{s.parse(c,r,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,r={},a={},o=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(o.decode(new Uint8Array(e,0,4))===Pc){try{r[le.KHR_BINARY_GLTF]=new Ra(e)}catch(u){i&&i(u);return}s=JSON.parse(r[le.KHR_BINARY_GLTF].content)}else s=JSON.parse(o.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new Ua(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,r[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){let u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case le.KHR_MATERIALS_UNLIT:r[u]=new ua;break;case le.KHR_DRACO_MESH_COMPRESSION:r[u]=new Ca(s,this.dracoLoader);break;case le.KHR_TEXTURE_TRANSFORM:r[u]=new Ia;break;case le.KHR_MESH_QUANTIZATION:r[u]=new Pa;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(r),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function sf(){let l={};return{get:function(e){return l[e]},add:function(e,t){l[e]=t},remove:function(e){delete l[e]},removeAll:function(){l={}}}}function Ae(l,e,t){let n=l.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var le={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DIFFUSE_ROUGHNESS:"KHR_materials_diffuse_roughness",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},ha=class{constructor(e){this.parser=e,this.name=le.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,o=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,h=new ae(16777215);o.color!==void 0&&h.setRGB(o.color[0],o.color[1],o.color[2],tt);let u=o.range!==void 0?o.range:0;switch(o.type){case"directional":c=new Cn(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Rn(h),c.distance=u;break;case"spot":c=new En(h),c.distance=u,o.spot=o.spot||{},o.spot.innerConeAngle=o.spot.innerConeAngle!==void 0?o.spot.innerConeAngle:0,o.spot.outerConeAngle=o.spot.outerConeAngle!==void 0?o.spot.outerConeAngle:Math.PI/4,c.angle=o.spot.outerConeAngle,c.penumbra=1-o.spot.innerConeAngle/o.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+o.type)}return c.position.set(0,0,0),Dt(c,o),o.intensity!==void 0&&(c.intensity=o.intensity),c.name=t.createUniqueName(o.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(o){return n._getNodeRef(t.cache,a,o)})}},ua=class{constructor(){this.name=le.KHR_MATERIALS_UNLIT}getMaterialType(){return it}extendParams(e,t,n){let i=[];e.color=new ae(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let r=s.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],tt),e.opacity=r[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,fe))}return Promise.all(i)}},da=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Ae(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},fa=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Ae(this.parser,e,this.name)!==null?Ye:null}extendMaterialParams(e,t){let n=Ae(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let s=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new pe(s,s)}return Promise.all(i)}},pa=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return Ae(this.parser,e,this.name)!==null?Ye:null}extendMaterialParams(e,t){let n=Ae(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.diffuseRoughness=n.diffuseRoughnessFactor!==void 0?n.diffuseRoughnessFactor:0,n.diffuseRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"diffuseRoughnessMap",n.diffuseRoughnessTexture)),Promise.all(i)}},ma=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Ae(this.parser,e,this.name)!==null?Ye:null}extendMaterialParams(e,t){let n=Ae(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},ga=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Ae(this.parser,e,this.name)!==null?Ye:null}extendMaterialParams(e,t){let n=Ae(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},_a=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_SHEEN}getMaterialType(e){return Ae(this.parser,e,this.name)!==null?Ye:null}extendMaterialParams(e,t){let n=Ae(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new ae(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let s=n.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],tt)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,fe)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},xa=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Ae(this.parser,e,this.name)!==null?Ye:null}extendMaterialParams(e,t){let n=Ae(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},ya=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_VOLUME}getMaterialType(e){return Ae(this.parser,e,this.name)!==null?Ye:null}extendMaterialParams(e,t){let n=Ae(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let s=n.attenuationColor||[1,1,1];return t.attenuationColor=new ae().setRGB(s[0],s[1],s[2],tt),Promise.all(i)}},va=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_IOR}getMaterialType(e){return Ae(this.parser,e,this.name)!==null?Ye:null}extendMaterialParams(e,t){let n=Ae(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},ba=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Ae(this.parser,e,this.name)!==null?Ye:null}extendMaterialParams(e,t){let n=Ae(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let s=n.specularColorFactor||[1,1,1];return t.specularColor=new ae().setRGB(s[0],s[1],s[2],tt),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,fe)),Promise.all(i)}},Sa=class{constructor(e){this.parser=e,this.name=le.EXT_MATERIALS_BUMP}getMaterialType(e){return Ae(this.parser,e,this.name)!==null?Ye:null}extendMaterialParams(e,t){let n=Ae(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},Ma=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Ae(this.parser,e,this.name)!==null?Ye:null}extendMaterialParams(e,t){let n=Ae(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},wa=class{constructor(e){this.parser=e,this.name=le.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,r)}},Ta=class{constructor(e){this.parser=e,this.name=le.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let r=s.extensions[t],a=i.images[r.source],o=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(o=c)}return n.loadTextureImage(e,r.source,o)}},Aa=class{constructor(e){this.parser=e,this.name=le.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let r=s.extensions[t],a=i.images[r.source],o=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(o=c)}return n.loadTextureImage(e,r.source,o)}},zs=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){let o=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,o,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):r.ready.then(function(){let f=new ArrayBuffer(h*u);return r.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}},Ea=class{constructor(e){this.name=le.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==dt.TRIANGLES&&c.mode!==dt.TRIANGLE_STRIP&&c.mode!==dt.TRIANGLE_FAN&&c.mode!==void 0)return null;let r=n.extensions[this.name].attributes,a=[],o={};for(let c in r)a.push(this.parser.getDependency("accessor",r[c]).then(h=>(o[c]=h,o[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(let p of u){let m=new se,g=new U,_=new Ee,v=new U(1,1,1),b=new bi(p.geometry,p.material,d);for(let w=0;w<d;w++)o.TRANSLATION&&g.fromBufferAttribute(o.TRANSLATION,w),o.ROTATION&&_.fromBufferAttribute(o.ROTATION,w),o.SCALE&&v.fromBufferAttribute(o.SCALE,w),b.setMatrixAt(w,m.compose(g,_,v));let S=null;for(let w in o)if(w==="_COLOR_0"){let T=o[w];b.instanceColor=new Wt(T.array,T.itemSize,T.normalized)}else if(w!=="TRANSLATION"&&w!=="ROTATION"&&w!=="SCALE"){if(S===null){let E=b.geometry;S=new Te,S.name=E.name;for(let I in E.attributes)S.setAttribute(I,E.attributes[I]);for(let I in E.morphAttributes)S.morphAttributes[I]=E.morphAttributes[I];E.index!==null&&S.setIndex(E.index),S.morphTargetsRelative=E.morphTargetsRelative;for(let I of E.groups)S.addGroup(I.start,I.count,I.materialIndex);E.boundingBox!==null&&(S.boundingBox=E.boundingBox.clone()),E.boundingSphere!==null&&(S.boundingSphere=E.boundingSphere.clone()),S.drawRange.start=E.drawRange.start,S.drawRange.count=E.drawRange.count,S.userData=Object.assign({},E.userData),b.geometry=S}let T=o[w];S.setAttribute(w,new Wt(T.array,T.itemSize,T.normalized))}Re.prototype.copy.call(b,p),this.parser.assignFinalMaterial(b),f.push(b)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},Pc="glTF",Gi=12,Ec={JSON:1313821514,BIN:5130562},Ra=class{constructor(e){this.name=le.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Gi),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Pc)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Gi,s=new DataView(e,Gi),r=0;for(;r<i;){let a=s.getUint32(r,!0);r+=4;let o=s.getUint32(r,!0);if(r+=4,o===Ec.JSON){let c=new Uint8Array(e,Gi+r,a);this.content=n.decode(c)}else if(o===Ec.BIN){let c=Gi+r;this.body=e.slice(c,c+a)}r+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Ca=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=le.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,a={},o={},c={};for(let h in r){let u=La[h]||h.toLowerCase();a[u]=r[h]}for(let h in e.attributes){let u=La[h]||h.toLowerCase();if(r[h]!==void 0){let d=n.accessors[e.attributes[h]],f=ni[d.componentType];c[u]=f.name,o[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(let p in f.attributes){let m=f.attributes[p],g=o[p];g!==void 0&&(m.normalized=g)}u(f)},a,c,tt,d)})})}},Ia=class{constructor(){this.name=le.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),i=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*i,e.offset.x,-e.repeat.x*i,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},Pa=class{constructor(){this.name=le.KHR_MESH_QUANTIZATION}},Gs=class extends Ct{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let r=0;r!==i;r++)t[r]=n[s+r];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,p=e*c,m=p-c,g=-2*f+3*d,_=f-d,v=1-g,b=_-d+u;for(let S=0;S!==a;S++){let w=r[m+S+a],T=r[m+S+o]*h,E=r[p+S+a],I=r[p+S]*h;s[S]=v*w+b*T+g*E+_*I}return s}},rf=new Ee,Na=class extends Gs{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return rf.fromArray(s).normalize().toArray(s),s}},dt={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ni={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Rc={9728:rn,9729:_t,9984:Ui,9985:Fi,9986:Oi,9987:Nt},Cc={33071:Ke,33648:xn,10497:Ge},oa={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},La={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},dn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},af={CUBICSPLINE:void 0,LINEAR:Vt,STEP:xt},ca={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function of(l){return l.DefaultMaterial===void 0&&(l.DefaultMaterial=new ut({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:In})),l.DefaultMaterial}function Pn(l,e,t){for(let n in t.extensions)l[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Dt(l,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(l.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function cf(l,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(l);let r=[],a=[],o=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):l.attributes.position;r.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):l.attributes.normal;a.push(d)}if(s){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):l.attributes.color;o.push(d)}}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(o)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(l.morphAttributes.position=h),i&&(l.morphAttributes.normal=u),s&&(l.morphAttributes.color=d),l.morphTargetsRelative=!0,l})}function lf(l,e){if(l.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)l.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(l.morphTargetInfluences.length===t.length){l.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)l.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function hf(l){let e,t=l.extensions&&l.extensions[le.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+la(t.attributes):e=l.indices+":"+la(l.attributes)+":"+l.mode,l.targets!==void 0)for(let n=0,i=l.targets.length;n<i;n++)e+=":"+la(l.targets[n]);return e}function la(l){let e="",t=Object.keys(l).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+l[t[n]]+";";return e}function Da(l){switch(l){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function uf(l){return l.search(/\.jpe?g($|\?)/i)>0||l.search(/^data\:image\/jpeg/)===0?"image/jpeg":l.search(/\.webp($|\?)/i)>0||l.search(/^data\:image\/webp/)===0?"image/webp":l.search(/\.ktx2($|\?)/i)>0||l.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var df=new se,Ua=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new sf,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,r=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let o=a.match(/Version\/(\d+)/);i=n&&o?parseInt(o[1],10):-1,s=a.indexOf("Firefox")>-1,r=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&r<98?(this.textureLoader=new Tn(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new Li(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new at(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType("arraybuffer"),(this.options.withCredentials||this.options.crossOrigin==="use-credentials")&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){let a={scene:r[0][i.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:i.asset,parser:n,userData:{}};return Pn(s,a,i),Dt(a,i),Promise.all(n._invokeAll(function(o){return o.afterRoot&&o.afterRoot(a)})).then(function(){for(let o of a.scenes)o.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let r=t[i].joints;for(let a=0,o=r.length;a<o;a++)e[r[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let r=e[i];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(r,a)=>{let o=this.associations.get(r);o!=null&&this.associations.set(a,o);for(let[c,h]of r.children.entries())s(h,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[le.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,r){n.load(bt.resolveURL(t.uri,i.path),s,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let r=oa[i.type],a=ni[i.componentType],o=i.normalized===!0,c=new a(i.count*r);return Promise.resolve(new xe(c,r,o))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(r){let a=r[0],o=oa[i.type],c=ni[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*o,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0,m,g;if(f&&f!==u){let _=Math.floor(d/f),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+_+":"+i.count,b=t.cache.get(v);b||(m=new c(a,_*f,i.count*f/h),b=new Kn(m,f/h),t.cache.add(v,b)),g=new jn(b,o,d%f/h,p)}else a===null?m=new c(i.count*o):m=new c(a,d,i.count*o),g=new xe(m,o,p);if(i.sparse!==void 0){let _=oa.SCALAR,v=ni[i.sparse.indices.componentType],b=i.sparse.indices.byteOffset||0,S=i.sparse.values.byteOffset||0,w=new v(r[1],b,i.sparse.count*_),T=new c(r[2],S,i.sparse.count*o);a!==null&&(g=new xe(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let E=0,I=w.length;E<I;E++){let L=w[E];if(g.setX(L,T[E*o]),o>=2&&g.setY(L,T[E*o+1]),o>=3&&g.setZ(L,T[E*o+2]),o>=4&&g.setW(L,T[E*o+3]),o>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,r=t.images[s],a=this.textureLoader;if(r.uri){let o=n.manager.getHandler(r.uri);o!==null&&(a=o)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){let i=this,s=this.json,r=s.textures[e],a=s.images[t],o=(a.uri||a.bufferView)+":"+r.sampler;if(this.textureCache[o])return this.textureCache[o];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=r.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let d=(s.samplers||{})[r.sampler]||{};return h.magFilter=Rc[d.magFilter]||_t,h.minFilter=Rc[d.minFilter]||Nt,h.wrapS=Cc[d.wrapS]||Ge,h.wrapT=Cc[d.wrapT]||Ge,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==rn&&h.minFilter!==_t,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[o]=c,c}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let r=i.images[e],a=self.URL||self.webkitURL,o=r.uri||"",c=!1,h;if(t.isKTX2Loader===!0&&r.bufferView!==void 0)h=n.getDependency("bufferView",r.bufferView).then(function(d){return new Promise(function(f,p){t.parse(d,f,p)})});else{if(r.bufferView!==void 0)o=n.getDependency("bufferView",r.bufferView).then(function(d){c=!0;let f=new Blob([d],{type:r.mimeType});return o=a.createObjectURL(f),o});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");h=Promise.resolve(o).then(function(d){return new Promise(function(f,p){let m=f;t.isImageBitmapLoader===!0&&(m=function(g){let _=new nt(g);_.needsUpdate=!0,f(_)}),t.load(bt.resolveURL(d,s.path),m,void 0,p)})})}let u=h.then(function(d){return c===!0&&a.revokeObjectURL(o),Dt(d,r),d.userData.mimeType=r.mimeType||uf(r.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",o),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(r=r.clone(),r.channel=n.texCoord),s.extensions[le.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[le.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let o=s.associations.get(r);r=s.extensions[le.KHR_TEXTURE_TRANSFORM].extendTexture(r,a),s.associations.set(r,o)}}return i!==void 0&&(r.colorSpace=i),e[t]=r,r})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,o=this.cache.get(a);o||(o=new vt,Ve.prototype.copy.call(o,n),o.color.copy(n.color),o.map=n.map,o.sizeAttenuation=!1,this.cache.add(a,o)),n=o}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,o=this.cache.get(a);o||(o=new st,Ve.prototype.copy.call(o,n),o.color.copy(n.color),o.map=n.map,this.cache.add(a,o)),n=o}if(i||s||r){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),r&&(a+="flat-shading:");let o=this.cache.get(a);o||(o=n.clone(),s&&(o.vertexColors=!0),r&&(o.flatShading=!0),i&&(o.normalScale&&(o.normalScale.y*=-1),o.clearcoatNormalScale&&(o.clearcoatNormalScale.y*=-1)),this.cache.add(a,o),this.associations.set(o,this.associations.get(n))),n=o}e.material=n}getMaterialType(){return ut}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],r,a={},o=s.extensions||{},c=[];if(o[le.KHR_MATERIALS_UNLIT]){let u=i[le.KHR_MATERIALS_UNLIT];r=u.getMaterialType(),c.push(u.extendParams(a,s,t))}else{let u=s.pbrMetallicRoughness||{};if(a.color=new ae(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],tt),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,fe)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),r=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Pt);let h=s.alphaMode||ca.OPAQUE;if(h===ca.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===ca.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&r!==it&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new pe(1,1),s.normalTexture.scale!==void 0)){let u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&r!==it&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&r!==it){let u=s.emissiveFactor;a.emissive=new ae().setRGB(u[0],u[1],u[2],tt)}return s.emissiveTexture!==void 0&&r!==it&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,fe)),Promise.all(c).then(function(){let u=new r(a);return s.name&&(u.name=s.name),Dt(u,s),t.associations.set(u,{materials:e}),s.extensions&&Pn(i,u,s),u})}createUniqueName(e){let t=_e.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[le.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(o){return Ic(o,a,t)})}let r=[];for(let a=0,o=e.length;a<o;a++){let c=e[a],h=hf(c),u=i[h];if(u)r.push(u.promise);else{let d;c.extensions&&c.extensions[le.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Ic(new Te,c,t),c.mode===dt.TRIANGLE_STRIP?d=d.then(f=>aa(f,ki)):c.mode===dt.TRIANGLE_FAN&&(d=d.then(f=>aa(f,ti))),i[h]={primitive:c,promise:d},r.push(d)}}return Promise.all(r)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],r=s.primitives,a=[];for(let o=0,c=r.length;o<c;o++){let h=r[o].material===void 0?of(this.cache):this.getDependency("material",r[o].material);a.push(h)}return a.push(t.loadGeometries(r)),Promise.all(a).then(async function(o){let c=o.slice(0,o.length-1),h=o[o.length-1],u=[];for(let f=0,p=h.length;f<p;f++){let m=h[f],g=r[f],_,v=c[f];if(g.mode===dt.TRIANGLES||g.mode===dt.TRIANGLE_STRIP||g.mode===dt.TRIANGLE_FAN||g.mode===void 0){let b=s.isSkinnedMesh===!0,S=m.hasAttribute("skinIndex")&&m.hasAttribute("skinWeight");b&&S===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),_=b&&S?new bn(m,v):new Be(m,v),_.isSkinnedMesh===!0&&_.normalizeSkinWeights()}else if(g.mode===dt.LINES)_=new Rt(m,v);else if(g.mode===dt.LINE_STRIP)_=new Xt(m,v);else if(g.mode===dt.LINE_LOOP)_=new Si(m,v);else if(g.mode===dt.POINTS)_=new qt(m,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(_.geometry.morphAttributes).length>0&&lf(_,s),_.name=t.createUniqueName(s.name||"mesh_"+e),Dt(_,s),g.extensions&&Pn(i,_,g),t.assignFinalMaterial(_),u.push(_)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&Pn(i,u[0],s),u[0];let d=new He;s.extensions&&Pn(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new It(Ue.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new un(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Dt(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),r=i,a=[],o=[];for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u){a.push(u);let d=new se;s!==null&&d.fromArray(s.array,c*16),o.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Mn(a,o)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,r=[],a=[],o=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let f=i.channels[u],p=i.samplers[f.sampler],m=f.target,g=m.node,_=i.parameters!==void 0?i.parameters[p.input]:p.input,v=i.parameters!==void 0?i.parameters[p.output]:p.output;m.node!==void 0&&(r.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",_)),o.push(this.getDependency("accessor",v)),c.push(p),h.push(m))}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],p=u[2],m=u[3],g=u[4],_=[];for(let b=0,S=d.length;b<S;b++){let w=d[b],T=f[b],E=p[b],I=m[b],L=g[b];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let M=n._createAnimationTracks(w,T,E,I,L);if(M)for(let C=0;C<M.length;C++)_.push(M[C])}let v=new hn(s,void 0,_);return Dt(v,i),v})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let r=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&r.traverse(function(a){if(a.isMesh)for(let o=0,c=i.weights.length;o<c;o++)a.morphTargetInfluences[o]=i.weights[o]}),r})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),r=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)r.push(n.getDependency("node",a[c]));let o=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(r),o]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,df)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){let f=h.userData.pivot,p=u[0];h.pivot=new U().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],r=s.name?i.createUniqueName(s.name):"",a=[],o=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return o&&a.push(o),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(s.isBone===!0?h=new on:c.length>1?h=new He:c.length===1?h=c[0]:h=new Re,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=r),Dt(h,s),s.extensions&&Pn(n,h,s),s.matrix!==void 0){let u=new se;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){let u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new He;n.name&&(s.name=i.createUniqueName(n.name)),Dt(s,n),n.extensions&&Pn(t,s,n);let r=n.nodes||[],a=[];for(let o=0,c=r.length;o<c;o++)a.push(i.getDependency("node",r[o]));return Promise.all(a).then(function(o){for(let h=0,u=o.length;h<u;h++){let d=o[h];d.parent!==null?s.add(Tc(d)):s.add(d)}let c=h=>{let u=new Map;for(let[d,f]of i.associations)(d instanceof Ve||d instanceof nt)&&u.set(d,f);return h.traverse(d=>{let f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){let r=[],a=e.name?e.name:e.uuid,o=[];function c(f){f.morphTargetInfluences&&o.push(f.name?f.name:f.uuid)}dn[s.path]===dn.weights?(c(e),e.isGroup&&e.children.forEach(c)):o.push(a);let h;switch(dn[s.path]){case dn.weights:h=Zt;break;case dn.rotation:h=rt;break;case dn.translation:case dn.scale:h=Le;break;default:n.itemSize===1?h=Zt:h=Le;break}let u=i.interpolation!==void 0?af[i.interpolation]:Vt,d=this._getArrayFromAccessor(n);for(let f=0,p=o.length;f<p;f++){let m=new h(o[f]+"."+dn[s.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),r.push(m)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Da(t.constructor),i=new Float32Array(t.length);for(let s=0,r=t.length;s<r;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof rt?Na:Gs;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function ff(l,e,t){let n=e.attributes,i=new qe;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],o=a.min,c=a.max;if(o!==void 0&&c!==void 0){if(i.set(new U(o[0],o[1],o[2]),new U(c[0],c[1],c[2])),a.normalized){let h=Da(ni[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let a=new U,o=new U;for(let c=0,h=s.length;c<h;c++){let u=s[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(o.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),o.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),o.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){let m=Da(ni[d.componentType]);o.multiplyScalar(m)}a.max(o)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}l.boundingBox=i;let r=new je;i.getCenter(r.center),r.radius=i.min.distanceTo(i.max)/2,l.boundingSphere=r}function Ic(l,e,t){let n=e.attributes,i=[];function s(r,a){return t.getDependency("accessor",r).then(function(o){l.setAttribute(a,o)})}for(let r in n){let a=La[r]||r.toLowerCase();a in l.attributes||i.push(s(n[r],a))}if(e.indices!==void 0&&!l.index){let r=t.getDependency("accessor",e.indices).then(function(a){l.setIndex(a)});i.push(r)}return Ie.workingColorSpace!==tt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ie.workingColorSpace}" not supported.`),Dt(l,e),ff(l,e,t),Promise.all(i).then(function(){return e.targets!==void 0?cf(l,e.targets,t):l})}var Hi=class extends Ii{constructor(e){super(e)}parse(e){function t(G){switch(G.image_type){case d:case m:if(G.colormap_length>256||G.colormap_size!==24||G.colormap_type!==1)throw new Error("THREE.TGALoader: Invalid type colormap data for indexed type.");break;case f:case p:case g:case _:if(G.colormap_type)throw new Error("THREE.TGALoader: Invalid type colormap data for colormap type.");break;case u:throw new Error("THREE.TGALoader: No data.");default:throw new Error("THREE.TGALoader: Invalid type "+G.image_type)}if(G.width<=0||G.height<=0)throw new Error("THREE.TGALoader: Invalid image size.");if(G.pixel_size!==8&&G.pixel_size!==16&&G.pixel_size!==24&&G.pixel_size!==32)throw new Error("THREE.TGALoader: Invalid pixel size "+G.pixel_size)}function n(G,k,Y,P,N){let K,X,H=Y.pixel_size>>3,te=Y.width*Y.height*H;if(k&&(X=N.subarray(P,P+=Y.colormap_length*(Y.colormap_size>>3))),G){K=new Uint8Array(te);let ee,Z,Q,oe=0,he=new Uint8Array(H);for(;oe<te;)if(ee=N[P++],Z=(ee&127)+1,ee&128){for(Q=0;Q<H;++Q)he[Q]=N[P++];for(Q=0;Q<Z;++Q)K.set(he,oe+Q*H);oe+=H*Z}else{for(Z*=H,Q=0;Q<Z;++Q)K[oe+Q]=N[P++];oe+=Z}}else K=N.subarray(P,P+=k?Y.width*Y.height:te);return{pixel_data:K,palettes:X}}function i(G,k,Y,P,N,K,X,H,te){let ee=te,Z=M.colormap_index,Q,oe=0,he,Se,Pe=M.width;for(Se=k;Se!==P;Se+=Y)for(he=N;he!==X;he+=K,oe++)Q=H[oe]-Z,G[(he+Pe*Se)*4+3]=255,G[(he+Pe*Se)*4+2]=ee[Q*3+0],G[(he+Pe*Se)*4+1]=ee[Q*3+1],G[(he+Pe*Se)*4+0]=ee[Q*3+2];return G}function s(G,k,Y,P,N,K,X,H){let te,ee=0,Z,Q,oe=M.width;for(Q=k;Q!==P;Q+=Y)for(Z=N;Z!==X;Z+=K,ee+=2)te=H[ee+0]+(H[ee+1]<<8),G[(Z+oe*Q)*4+0]=(te&31744)>>7,G[(Z+oe*Q)*4+1]=(te&992)>>2,G[(Z+oe*Q)*4+2]=(te&31)<<3,G[(Z+oe*Q)*4+3]=te&32768?0:255;return G}function r(G,k,Y,P,N,K,X,H){let te=0,ee,Z,Q=M.width;for(Z=k;Z!==P;Z+=Y)for(ee=N;ee!==X;ee+=K,te+=3)G[(ee+Q*Z)*4+3]=255,G[(ee+Q*Z)*4+2]=H[te+0],G[(ee+Q*Z)*4+1]=H[te+1],G[(ee+Q*Z)*4+0]=H[te+2];return G}function a(G,k,Y,P,N,K,X,H){let te=0,ee,Z,Q=M.width;for(Z=k;Z!==P;Z+=Y)for(ee=N;ee!==X;ee+=K,te+=4)G[(ee+Q*Z)*4+2]=H[te+0],G[(ee+Q*Z)*4+1]=H[te+1],G[(ee+Q*Z)*4+0]=H[te+2],G[(ee+Q*Z)*4+3]=H[te+3];return G}function o(G,k,Y,P,N,K,X,H){let te,ee=0,Z,Q,oe=M.width;for(Q=k;Q!==P;Q+=Y)for(Z=N;Z!==X;Z+=K,ee++)te=H[ee],G[(Z+oe*Q)*4+0]=te,G[(Z+oe*Q)*4+1]=te,G[(Z+oe*Q)*4+2]=te,G[(Z+oe*Q)*4+3]=255;return G}function c(G,k,Y,P,N,K,X,H){let te=0,ee,Z,Q=M.width;for(Z=k;Z!==P;Z+=Y)for(ee=N;ee!==X;ee+=K,te+=2)G[(ee+Q*Z)*4+0]=H[te+0],G[(ee+Q*Z)*4+1]=H[te+0],G[(ee+Q*Z)*4+2]=H[te+0],G[(ee+Q*Z)*4+3]=H[te+1];return G}function h(G,k,Y,P,N){let K,X,H,te,ee,Z;switch((M.flags&v)>>b){default:case T:K=0,H=1,ee=k,X=0,te=1,Z=Y;break;case S:K=0,H=1,ee=k,X=Y-1,te=-1,Z=-1;break;case E:K=k-1,H=-1,ee=-1,X=0,te=1,Z=Y;break;case w:K=k-1,H=-1,ee=-1,X=Y-1,te=-1,Z=-1;break}if(F)switch(M.pixel_size){case 8:o(G,X,te,Z,K,H,ee,P);break;case 16:c(G,X,te,Z,K,H,ee,P);break;default:throw new Error("THREE.TGALoader: Format not supported.")}else switch(M.pixel_size){case 8:i(G,X,te,Z,K,H,ee,P,N);break;case 16:s(G,X,te,Z,K,H,ee,P);break;case 24:r(G,X,te,Z,K,H,ee,P);break;case 32:a(G,X,te,Z,K,H,ee,P);break;default:throw new Error("THREE.TGALoader: Format not supported.")}return G}let u=0,d=1,f=2,p=3,m=9,g=10,_=11,v=48,b=4,S=0,w=1,T=2,E=3;if(e.length<19)throw new Error("THREE.TGALoader: Not enough data to contain header.");let I=0,L=new Uint8Array(e),M={id_length:L[I++],colormap_type:L[I++],image_type:L[I++],colormap_index:L[I++]|L[I++]<<8,colormap_length:L[I++]|L[I++]<<8,colormap_size:L[I++],origin:[L[I++]|L[I++]<<8,L[I++]|L[I++]<<8],width:L[I++]|L[I++]<<8,height:L[I++]|L[I++]<<8,pixel_size:L[I++],flags:L[I++]};if(t(M),M.id_length+I>e.length)throw new Error("THREE.TGALoader: No data.");I+=M.id_length;let C=!1,y=!1,F=!1;switch(M.image_type){case m:C=!0,y=!0;break;case d:y=!0;break;case g:C=!0;break;case f:break;case _:C=!0,F=!0;break;case p:F=!0;break}let j=new Uint8Array(M.width*M.height*4),O=n(C,y,M,I,L);return h(j,M.width,M.height,O.pixel_data,O.palettes),{data:j,width:M.width,height:M.height,flipY:!0,generateMipmaps:!0,minFilter:Nt}}};function $e(l,e){let t=[],n=l.childNodes;for(let i=0,s=n.length;i<s;i++){let r=n[i];r.nodeName===e&&t.push(r)}return t}function pf(l){return l.length===0?[]:l.trim().split(/\s+/)}function We(l){return l.length===0?[]:l.trim().split(/\s+/).map(parseFloat)}function Hs(l){return l.length===0?[]:l.trim().split(/\s+/).map(e=>parseInt(e))}function Fe(l){return l.substring(1)}var Vs=class{constructor(){this.count=0}generateId(){return"three_default_"+this.count++}parse(e){if(e.length===0)return null;let t=new DOMParser().parseFromString(e,"application/xml"),n=$e(t,"COLLADA")[0],i=t.getElementsByTagName("parsererror")[0];if(i!==void 0){let o=$e(i,"div")[0],c;return o?c=o.textContent:c=this.parserErrorToText(i),console.error(`THREE.ColladaLoader: Failed to parse collada file.
`,c),null}let s=n.getAttribute("version");console.debug("THREE.ColladaLoader: File version",s);let r=this.parseAsset($e(n,"asset")[0]),a={animations:{},clips:{},controllers:{},images:{},effects:{},materials:{},cameras:{},lights:{},geometries:{},nodes:{},visualScenes:{},kinematicsModels:{},physicsModels:{},kinematicsScenes:{},joints:{}};return this.library=a,this.collada=n,this.parseLibrary(n,"library_animations","animation",this.parseAnimation.bind(this)),this.parseLibrary(n,"library_animation_clips","animation_clip",this.parseAnimationClip.bind(this)),this.parseLibrary(n,"library_controllers","controller",this.parseController.bind(this)),this.parseLibrary(n,"library_images","image",this.parseImage.bind(this)),this.parseLibrary(n,"library_effects","effect",this.parseEffect.bind(this)),this.parseLibrary(n,"library_materials","material",this.parseMaterial.bind(this)),this.parseLibrary(n,"library_cameras","camera",this.parseCamera.bind(this)),this.parseLibrary(n,"library_lights","light",this.parseLight.bind(this)),this.parseLibrary(n,"library_geometries","geometry",this.parseGeometry.bind(this)),this.parseLibrary(n,"library_nodes","node",this.parseNode.bind(this)),this.parseLibrary(n,"library_visual_scenes","visual_scene",this.parseVisualScene.bind(this)),this.parseLibrary(n,"library_joints","joint",this.parseLibraryJoint.bind(this)),this.parseLibrary(n,"library_kinematics_models","kinematics_model",this.parseKinematicsModel.bind(this)),this.parseLibrary(n,"library_physics_models","physics_model",this.parsePhysicsModel.bind(this)),this.parseLibrary(n,"scene","instance_kinematics_scene",this.parseKinematicsScene.bind(this)),{library:a,asset:r,collada:n}}parserErrorToText(e){let t=[],n=[e];for(;n.length;){let i=n.shift();i.nodeType===Node.TEXT_NODE?t.push(i.textContent):(t.push(`
`),n.push(...i.childNodes))}return t.join("").trim()}parseAsset(e){return{unit:this.parseAssetUnit($e(e,"unit")[0]),upAxis:this.parseAssetUpAxis($e(e,"up_axis")[0])}}parseAssetUnit(e){return e!==void 0&&e.hasAttribute("meter")===!0?parseFloat(e.getAttribute("meter")):1}parseAssetUpAxis(e){return e!==void 0?e.textContent:"Y_UP"}parseLibrary(e,t,n,i){let s=$e(e,t)[0];if(s!==void 0){let r=$e(s,n);for(let a=0;a<r.length;a++)i(r[a])}}parseAnimation(e){let t={sources:{},samplers:{},channels:{}},n=!1;for(let i=0,s=e.childNodes.length;i<s;i++){let r=e.childNodes[i];if(r.nodeType!==1)continue;let a;switch(r.nodeName){case"source":a=r.getAttribute("id"),t.sources[a]=this.parseSource(r);break;case"sampler":a=r.getAttribute("id"),t.samplers[a]=this.parseAnimationSampler(r);break;case"channel":a=r.getAttribute("target"),t.channels[a]=this.parseAnimationChannel(r);break;case"animation":this.parseAnimation(r),n=!0;break;default:}}n===!1&&(this.library.animations[e.getAttribute("id")||Ue.generateUUID()]=t)}parseAnimationSampler(e){let t={inputs:{}};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];if(s.nodeType===1&&s.nodeName==="input"){let r=Fe(s.getAttribute("source")),a=s.getAttribute("semantic");t.inputs[a]=r}}return t}parseAnimationChannel(e){let t={},i=e.getAttribute("target").split("/"),s=i.shift(),r=i.shift(),a=r.indexOf("(")!==-1,o=r.indexOf(".")!==-1;if(o)i=r.split("."),r=i.shift(),t.member=i.shift();else if(a){let c=r.split("(");r=c.shift();for(let h=0;h<c.length;h++)c[h]=parseInt(c[h].replace(/\)/,""));t.indices=c}return t.id=s,t.sid=r,t.arraySyntax=a,t.memberSyntax=o,t.sampler=Fe(e.getAttribute("source")),t}parseAnimationClip(e){let t={name:e.getAttribute("id")||"default",start:parseFloat(e.getAttribute("start")||0),end:parseFloat(e.getAttribute("end")||0),animations:[]};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];s.nodeType===1&&s.nodeName==="instance_animation"&&t.animations.push(Fe(s.getAttribute("url")))}this.library.clips[e.getAttribute("id")]=t}parseController(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];if(s.nodeType===1)switch(s.nodeName){case"skin":t.id=Fe(s.getAttribute("source")),t.skin=this.parseSkin(s);break;case"morph":t.id=Fe(s.getAttribute("source")),console.warn("THREE.ColladaLoader: Morph target animation not supported yet.");break}}this.library.controllers[e.getAttribute("id")]=t}parseSkin(e){let t={sources:{}};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];if(s.nodeType===1)switch(s.nodeName){case"bind_shape_matrix":t.bindShapeMatrix=We(s.textContent);break;case"source":let r=s.getAttribute("id");t.sources[r]=this.parseSource(s);break;case"joints":t.joints=this.parseJoints(s);break;case"vertex_weights":t.vertexWeights=this.parseVertexWeights(s);break}}return t}parseJoints(e){let t={inputs:{}};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];if(s.nodeType===1&&s.nodeName==="input"){let r=s.getAttribute("semantic"),a=Fe(s.getAttribute("source"));t.inputs[r]=a}}return t}parseVertexWeights(e){let t={inputs:{}};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];if(s.nodeType===1)switch(s.nodeName){case"input":let r=s.getAttribute("semantic"),a=Fe(s.getAttribute("source")),o=parseInt(s.getAttribute("offset"));t.inputs[r]={id:a,offset:o};break;case"vcount":t.vcount=Hs(s.textContent);break;case"v":t.v=Hs(s.textContent);break}}return t}parseImage(e){let t={init_from:$e(e,"init_from")[0].textContent};this.library.images[e.getAttribute("id")]=t}parseEffect(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];s.nodeType===1&&s.nodeName==="profile_COMMON"&&(t.profile=this.parseEffectProfileCOMMON(s))}this.library.effects[e.getAttribute("id")]=t}parseEffectProfileCOMMON(e){let t={surfaces:{},samplers:{}};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];if(s.nodeType===1)switch(s.nodeName){case"newparam":this.parseEffectNewparam(s,t);break;case"technique":t.technique=this.parseEffectTechnique(s);break;case"extra":t.extra=this.parseEffectExtra(s);break}}return t}parseEffectNewparam(e,t){let n=e.getAttribute("sid");for(let i=0,s=e.childNodes.length;i<s;i++){let r=e.childNodes[i];if(r.nodeType===1)switch(r.nodeName){case"surface":t.surfaces[n]=this.parseEffectSurface(r);break;case"sampler2D":t.samplers[n]=this.parseEffectSampler(r);break}}}parseEffectSurface(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];s.nodeType===1&&s.nodeName==="init_from"&&(t.init_from=s.textContent)}return t}parseEffectSampler(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];s.nodeType===1&&s.nodeName==="source"&&(t.source=s.textContent)}return t}parseEffectTechnique(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];if(s.nodeType===1)switch(s.nodeName){case"constant":case"lambert":case"blinn":case"phong":t.type=s.nodeName,t.parameters=this.parseEffectParameters(s);break;case"extra":t.extra=this.parseEffectExtra(s);break}}return t}parseEffectParameters(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];if(s.nodeType===1)switch(s.nodeName){case"emission":case"diffuse":case"specular":case"bump":case"ambient":case"shininess":case"transparency":t[s.nodeName]=this.parseEffectParameter(s);break;case"transparent":t[s.nodeName]={opaque:s.hasAttribute("opaque")?s.getAttribute("opaque"):"A_ONE",data:this.parseEffectParameter(s)};break}}return t}parseEffectParameter(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];if(s.nodeType===1)switch(s.nodeName){case"color":t[s.nodeName]=We(s.textContent);break;case"float":t[s.nodeName]=parseFloat(s.textContent);break;case"texture":t[s.nodeName]={id:s.getAttribute("texture"),extra:this.parseEffectParameterTexture(s)};break}}return t}parseEffectParameterTexture(e){let t={technique:{}};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];s.nodeType===1&&s.nodeName==="extra"&&this.parseEffectParameterTextureExtra(s,t)}return t}parseEffectParameterTextureExtra(e,t){for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];s.nodeType===1&&s.nodeName==="technique"&&this.parseEffectParameterTextureExtraTechnique(s,t)}}parseEffectParameterTextureExtraTechnique(e,t){for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];if(s.nodeType===1)switch(s.nodeName){case"repeatU":case"repeatV":case"offsetU":case"offsetV":t.technique[s.nodeName]=parseFloat(s.textContent);break;case"wrapU":case"wrapV":s.textContent.toUpperCase()==="TRUE"?t.technique[s.nodeName]=1:s.textContent.toUpperCase()==="FALSE"?t.technique[s.nodeName]=0:t.technique[s.nodeName]=parseInt(s.textContent);break;case"bump":t[s.nodeName]=this.parseEffectExtraTechniqueBump(s);break}}}parseEffectExtra(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];s.nodeType===1&&s.nodeName==="technique"&&(t.technique=this.parseEffectExtraTechnique(s))}return t}parseEffectExtraTechnique(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];if(s.nodeType===1)switch(s.nodeName){case"double_sided":t[s.nodeName]=parseInt(s.textContent);break;case"bump":t[s.nodeName]=this.parseEffectExtraTechniqueBump(s);break}}return t}parseEffectExtraTechniqueBump(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];s.nodeType===1&&s.nodeName==="texture"&&(t[s.nodeName]={id:s.getAttribute("texture"),texcoord:s.getAttribute("texcoord"),extra:this.parseEffectParameterTexture(s)})}return t}parseMaterial(e){let t={name:e.getAttribute("name")};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];s.nodeType===1&&s.nodeName==="instance_effect"&&(t.url=Fe(s.getAttribute("url")))}this.library.materials[e.getAttribute("id")]=t}parseCamera(e){let t={name:e.getAttribute("name")};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];s.nodeType===1&&s.nodeName==="optics"&&(t.optics=this.parseCameraOptics(s))}this.library.cameras[e.getAttribute("id")]=t}parseCameraOptics(e){for(let t=0;t<e.childNodes.length;t++){let n=e.childNodes[t];if(n.nodeName==="technique_common")return this.parseCameraTechnique(n)}return{}}parseCameraTechnique(e){let t={};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];switch(i.nodeName){case"perspective":case"orthographic":t.technique=i.nodeName,t.parameters=this.parseCameraParameters(i);break}}return t}parseCameraParameters(e){let t={};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];switch(i.nodeName){case"xfov":case"yfov":case"xmag":case"ymag":case"znear":case"zfar":case"aspect_ratio":t[i.nodeName]=parseFloat(i.textContent);break}}return t}parseLight(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];s.nodeType===1&&s.nodeName==="technique_common"&&(t=this.parseLightTechnique(s))}this.library.lights[e.getAttribute("id")]=t}parseLightTechnique(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];if(s.nodeType===1)switch(s.nodeName){case"directional":case"point":case"spot":case"ambient":t.technique=s.nodeName,t.parameters=this.parseLightParameters(s);break}}return t}parseLightParameters(e){let t={};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];if(s.nodeType===1)switch(s.nodeName){case"color":let r=We(s.textContent);t.color=new ae().fromArray(r),Ie.colorSpaceToWorking(t.color,fe);break;case"falloff_angle":t.falloffAngle=parseFloat(s.textContent);break;case"quadratic_attenuation":let a=parseFloat(s.textContent);t.distance=a?Math.sqrt(1/a):0;break}}return t}parseGeometry(e){let t={name:e.getAttribute("name"),sources:{},vertices:{},primitives:[]},n=$e(e,"mesh")[0];if(n!==void 0){for(let i=0;i<n.childNodes.length;i++){let s=n.childNodes[i];if(s.nodeType!==1)continue;let r=s.getAttribute("id");switch(s.nodeName){case"source":t.sources[r]=this.parseSource(s);break;case"vertices":t.vertices=this.parseGeometryVertices(s);break;case"polygons":case"lines":case"linestrips":case"polylist":case"triangles":t.primitives.push(this.parseGeometryPrimitive(s));break;default:}}this.library.geometries[e.getAttribute("id")]=t}}parseSource(e){let t={array:[],stride:3};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1)switch(i.nodeName){case"float_array":t.array=We(i.textContent);break;case"Name_array":t.array=pf(i.textContent);break;case"technique_common":let s=$e(i,"accessor")[0];s!==void 0&&(t.stride=parseInt(s.getAttribute("stride")));break}}return t}parseGeometryVertices(e){let t={};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];i.nodeType===1&&(t[i.getAttribute("semantic")]=Fe(i.getAttribute("source")))}return t}parseGeometryPrimitive(e){let t={type:e.nodeName,material:e.getAttribute("material"),count:parseInt(e.getAttribute("count")),inputs:{},stride:0,hasUV:!1};for(let n=0,i=e.childNodes.length;n<i;n++){let s=e.childNodes[n];if(s.nodeType===1)switch(s.nodeName){case"input":let r=Fe(s.getAttribute("source")),a=s.getAttribute("semantic"),o=parseInt(s.getAttribute("offset")),c=parseInt(s.getAttribute("set")),h=c>0?a+c:a;t.inputs[h]={id:r,offset:o},t.stride=Math.max(t.stride,o+1),a==="TEXCOORD"&&(t.hasUV=!0);break;case"vcount":t.vcount=Hs(s.textContent);break;case"p":t.p=Hs(s.textContent);break}}return t.type==="polygons"&&(t.vcount=[t.p.length/t.stride]),t}parseLibraryJoint(e){this.library.joints[e.getAttribute("id")]=this.parseKinematicsJoint(e)}parseKinematicsModel(e){let t={name:e.getAttribute("name")||"",joints:{},links:[]};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];i.nodeType===1&&i.nodeName==="technique_common"&&this.parseKinematicsTechniqueCommon(i,t)}this.library.kinematicsModels[e.getAttribute("id")]=t}parseKinematicsTechniqueCommon(e,t){for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1)switch(i.nodeName){case"joint":t.joints[i.getAttribute("sid")]=this.parseKinematicsJoint(i);break;case"instance_joint":t.joints[i.getAttribute("sid")]=this.library.joints[Fe(i.getAttribute("url"))];break;case"link":t.links.push(this.parseKinematicsLink(i));break}}}parseKinematicsJoint(e){let t;for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1)switch(i.nodeName){case"prismatic":case"revolute":t=this.parseKinematicsJointParameter(i);break}}return t}parseKinematicsJointParameter(e){let t={sid:e.getAttribute("sid"),name:e.getAttribute("name")||"",axis:new U,limits:{min:0,max:0},type:e.nodeName,static:!1,zeroPosition:0,middlePosition:0};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1)switch(i.nodeName){case"axis":let s=We(i.textContent);t.axis.fromArray(s);break;case"limits":let r=i.getElementsByTagName("max")[0],a=i.getElementsByTagName("min")[0];t.limits.max=parseFloat(r.textContent),t.limits.min=parseFloat(a.textContent);break}}return t.limits.min>=t.limits.max&&(t.static=!0),t.middlePosition=(t.limits.min+t.limits.max)/2,t}parseKinematicsLink(e){let t={sid:e.getAttribute("sid"),name:e.getAttribute("name")||"",attachments:[],transforms:[]};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1)switch(i.nodeName){case"attachment_full":t.attachments.push(this.parseKinematicsAttachment(i));break;case"matrix":case"translate":case"rotate":t.transforms.push(this.parseKinematicsTransform(i));break}}return t}parseKinematicsAttachment(e){let t={joint:e.getAttribute("joint").split("/").pop(),transforms:[],links:[]};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1)switch(i.nodeName){case"link":t.links.push(this.parseKinematicsLink(i));break;case"matrix":case"translate":case"rotate":t.transforms.push(this.parseKinematicsTransform(i));break}}return t}parseKinematicsTransform(e){let t={type:e.nodeName},n=We(e.textContent);switch(t.type){case"matrix":t.obj=new se,t.obj.fromArray(n).transpose();break;case"translate":t.obj=new U,t.obj.fromArray(n);break;case"rotate":t.obj=new U,t.obj.fromArray(n),t.angle=Ue.degToRad(n[3]);break}return t}parsePhysicsModel(e){let t={name:e.getAttribute("name")||"",rigidBodies:{}};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];i.nodeType===1&&i.nodeName==="rigid_body"&&(t.rigidBodies[i.getAttribute("name")]={},this.parsePhysicsRigidBody(i,t.rigidBodies[i.getAttribute("name")]))}this.library.physicsModels[e.getAttribute("id")]=t}parsePhysicsRigidBody(e,t){for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];i.nodeType===1&&i.nodeName==="technique_common"&&this.parsePhysicsTechniqueCommon(i,t)}}parsePhysicsTechniqueCommon(e,t){for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1)switch(i.nodeName){case"inertia":t.inertia=We(i.textContent);break;case"mass":t.mass=We(i.textContent)[0];break}}}parseKinematicsScene(e){let t={bindJointAxis:[]};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];i.nodeType===1&&i.nodeName==="bind_joint_axis"&&t.bindJointAxis.push(this.parseKinematicsBindJointAxis(i))}this.library.kinematicsScenes[Fe(e.getAttribute("url"))]=t}parseKinematicsBindJointAxis(e){let t={target:e.getAttribute("target").split("/").pop()};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];if(i.nodeType===1&&i.nodeName==="axis"){let s=i.getElementsByTagName("param")[0];t.axis=s.textContent;let r=t.axis.split("inst_").pop().split("axis")[0];t.jointIndex=r.substring(0,r.length-1)}}return t}prepareNodes(e){let t=e.getElementsByTagName("node");for(let n=0;n<t.length;n++){let i=t[n];i.hasAttribute("id")===!1&&i.setAttribute("id",this.generateId())}}parseNode(e){let t=new se,n=new U,i={name:e.getAttribute("name")||"",type:e.getAttribute("type"),id:e.getAttribute("id"),sid:e.getAttribute("sid"),matrix:new se,nodes:[],instanceCameras:[],instanceControllers:[],instanceLights:[],instanceGeometries:[],instanceNodes:[],transforms:{},transformData:{},transformOrder:[]};for(let s=0;s<e.childNodes.length;s++){let r=e.childNodes[s];if(r.nodeType!==1)continue;let a;switch(r.nodeName){case"node":i.nodes.push(r.getAttribute("id")),this.parseNode(r);break;case"instance_camera":i.instanceCameras.push(Fe(r.getAttribute("url")));break;case"instance_controller":i.instanceControllers.push(this.parseNodeInstance(r));break;case"instance_light":i.instanceLights.push(Fe(r.getAttribute("url")));break;case"instance_geometry":i.instanceGeometries.push(this.parseNodeInstance(r));break;case"instance_node":i.instanceNodes.push(Fe(r.getAttribute("url")));break;case"matrix":a=We(r.textContent),i.matrix.multiply(t.fromArray(a).transpose());{let o=r.getAttribute("sid");i.transforms[o]=r.nodeName,i.transformData[o]={type:"matrix",array:a},i.transformOrder.push(o)}break;case"translate":a=We(r.textContent),n.fromArray(a),i.matrix.multiply(t.makeTranslation(n.x,n.y,n.z));{let o=r.getAttribute("sid");i.transforms[o]=r.nodeName,i.transformData[o]={type:"translate",x:a[0],y:a[1],z:a[2]},i.transformOrder.push(o)}break;case"rotate":a=We(r.textContent);{let o=Ue.degToRad(a[3]);i.matrix.multiply(t.makeRotationAxis(n.fromArray(a),o));let c=r.getAttribute("sid");i.transforms[c]=r.nodeName,i.transformData[c]={type:"rotate",axis:[a[0],a[1],a[2]],angle:a[3]},i.transformOrder.push(c)}break;case"scale":a=We(r.textContent),i.matrix.scale(n.fromArray(a));{let o=r.getAttribute("sid");i.transforms[o]=r.nodeName,i.transformData[o]={type:"scale",x:a[0],y:a[1],z:a[2]},i.transformOrder.push(o)}break;case"extra":break;default:}}return this.hasNode(i.id)?console.warn("THREE.ColladaLoader: There is already a node with ID %s. Exclude current node from further processing.",i.id):this.library.nodes[i.id]=i,i}parseNodeInstance(e){let t={id:Fe(e.getAttribute("url")),materials:{},skeletons:[]};for(let n=0;n<e.childNodes.length;n++){let i=e.childNodes[n];switch(i.nodeName){case"bind_material":let s=i.getElementsByTagName("instance_material");for(let r=0;r<s.length;r++){let a=s[r],o=a.getAttribute("symbol"),c=a.getAttribute("target");t.materials[o]=Fe(c)}break;case"skeleton":t.skeletons.push(Fe(i.textContent));break;default:break}}return t}parseVisualScene(e){let t={name:e.getAttribute("name"),children:[]};this.prepareNodes(e);let n=$e(e,"node");for(let i=0;i<n.length;i++)t.children.push(this.parseNode(n[i]));this.library.visualScenes[e.getAttribute("id")]=t}hasNode(e){return this.library.nodes[e]!==void 0}};var Ws=class{constructor(e,t,n,i){this.library=e,this.collada=t,this.textureLoader=n,this.tgaLoader=i,this.tempColor=new ae,this.animations=[],this.kinematics={},this.position=new U,this.scale=new U,this.quaternion=new Ee,this.matrix=new se,this.deferredPivotAnimations={},this.transformNodes={}}compose(){let e=this.library;this.buildLibrary(e.animations,this.buildAnimation.bind(this)),this.buildLibrary(e.clips,this.buildAnimationClip.bind(this)),this.buildLibrary(e.controllers,this.buildController.bind(this)),this.buildLibrary(e.images,this.buildImage.bind(this)),this.buildLibrary(e.effects,this.buildEffect.bind(this)),this.buildLibrary(e.materials,this.buildMaterial.bind(this)),this.buildLibrary(e.cameras,this.buildCamera.bind(this)),this.buildLibrary(e.lights,this.buildLight.bind(this)),this.buildLibrary(e.geometries,this.buildGeometry.bind(this)),this.buildLibrary(e.visualScenes,this.buildVisualScene.bind(this)),this.setupAnimations(),this.setupKinematics();let t=this.parseScene($e(this.collada,"scene")[0]);return t.animations=this.animations,{scene:t,animations:this.animations,kinematics:this.kinematics}}buildLibrary(e,t){for(let n in e){let i=e[n];i.build=t(e[n])}}getBuild(e,t){return e.build!==void 0||(e.build=t(e)),e.build}isEmpty(e){return Object.keys(e).length===0}buildAnimation(e){let t=[],n=e.channels,i=e.samplers,s=e.sources,r=this.aggregateAnimationChannels(n,i,s);for(let a in r){let o=this.library.nodes[a];if(!o)continue;let c=r[a];if(this.hasPivotTransforms(o))this.collectDeferredPivotAnimation(a,c);else{let h=this.getNode(a),u=!1;for(let d in c){let f=o.transforms[d],p=o.transformData[d],m=c[d];switch(f){case"matrix":this.buildMatrixTracks(h,m,o,t);break;case"translate":this.buildTranslateTrack(h,m,p,t);break;case"rotate":u||(this.buildRotateTrack(h,d,m,p,o,t),u=!0);break;case"scale":this.buildScaleTrack(h,m,p,t);break}}}}return t}collectDeferredPivotAnimation(e,t){this.deferredPivotAnimations[e]||(this.deferredPivotAnimations[e]={});let n=this.deferredPivotAnimations[e];for(let i in t){n[i]||(n[i]={});for(let s in t[i])n[i][s]=t[i][s]}}hasPivotTransforms(e){let t=["rotatePivot","rotatePivotInverse","rotatePivotTranslation","scalePivot","scalePivotInverse","scalePivotTranslation"];for(let n of t)if(e.transforms[n]!==void 0)return!0;return!1}getAnimation(e){return this.getBuild(this.library.animations[e],this.buildAnimation.bind(this))}aggregateAnimationChannels(e,t,n){let i={};for(let s in e){if(!e.hasOwnProperty(s))continue;let r=e[s],a=t[r.sampler],o=a.inputs.INPUT,c=a.inputs.OUTPUT,h=n[o],u=n[c],d=a.inputs.INTERPOLATION,f=a.inputs.IN_TANGENT,p=a.inputs.OUT_TANGENT,m=d?n[d]:null,g=f?n[f]:null,_=p?n[p]:null,v=r.id,b=r.sid,S=r.member||"default";i[v]||(i[v]={}),i[v][b]||(i[v][b]={}),i[v][b][S]={times:h.array,values:u.array,stride:u.stride,arraySyntax:r.arraySyntax,indices:r.indices,interpolation:m?m.array:null,inTangent:g?g.array:null,outTangent:_?_.array:null,inTangentStride:g?g.stride:0,outTangentStride:_?_.stride:0}}return i}buildMatrixTracks(e,t,n,i){let s=n.matrix.clone().transpose(),r={};for(let c in t){let h=t[c],u=h.times,d=h.values,f=h.stride;for(let p=0,m=u.length;p<m;p++){let g=u[p],_=p*f;if(r[g]===void 0&&(r[g]={}),h.arraySyntax===!0){let v=d[_],b=h.indices[0]+4*h.indices[1];r[g][b]=v}else for(let v=0;v<f;v++)r[g][v]=d[_+v]}}let a=this.prepareAnimationData(r,s),o={name:e.uuid,keyframes:a};this.createKeyframeTracks(o,i)}buildTranslateTrack(e,t,n,i){if(t.default&&t.default.stride===3){let c=t.default,h=Array.from(c.times),u=Array.from(c.values),d=new Le(e.uuid+".position",h,u),f=this.getInterpolationInfo(t);this.applyInterpolation(d,f,t),i.push(d);return}let s=this.getTimesForAllAxes(t);if(s.length===0)return;let r=[],a=this.getInterpolationInfo(t);for(let c=0;c<s.length;c++){let h=s[c],u=this.getValueAtTime(t.X,h,n.x),d=this.getValueAtTime(t.Y,h,n.y),f=this.getValueAtTime(t.Z,h,n.z);r.push(u,d,f)}let o=new Le(e.uuid+".position",s,r);this.applyInterpolation(o,a),i.push(o)}buildRotateTrack(e,t,n,i,s,r){let a=n.ANGLE||n.default;if(!a)return;let o=Array.from(a.times);if(o.length===0)return;let c=[];for(let g of s.transformOrder)if(s.transforms[g]==="rotate"){let v=s.transformData[g];c.push({sid:g,axis:new U(v.axis[0],v.axis[1],v.axis[2]),defaultAngle:v.angle})}let h=new Ee,u=new Ee,d=new Ee,f=[],p=this.getInterpolationInfo(n);for(let g=0;g<o.length;g++){let _=o[g];h.identity();for(let v of c){let b;v.sid===t?b=this.getValueAtTime(a,_,v.defaultAngle):b=v.defaultAngle;let S=Ue.degToRad(b);d.setFromAxisAngle(v.axis,S),h.multiply(d)}g>0&&u.dot(h)<0&&(h.x=-h.x,h.y=-h.y,h.z=-h.z,h.w=-h.w),u.copy(h),f.push(h.x,h.y,h.z,h.w)}let m=new rt(e.uuid+".quaternion",o,f);this.applyInterpolation(m,p),r.push(m)}buildScaleTrack(e,t,n,i){if(t.default&&t.default.stride===3){let c=t.default,h=Array.from(c.times),u=Array.from(c.values),d=new Le(e.uuid+".scale",h,u),f=this.getInterpolationInfo(t);this.applyInterpolation(d,f,t),i.push(d);return}let s=this.getTimesForAllAxes(t);if(s.length===0)return;let r=[],a=this.getInterpolationInfo(t);for(let c=0;c<s.length;c++){let h=s[c],u=this.getValueAtTime(t.X,h,n.x),d=this.getValueAtTime(t.Y,h,n.y),f=this.getValueAtTime(t.Z,h,n.z);r.push(u,d,f)}let o=new Le(e.uuid+".scale",s,r);this.applyInterpolation(o,a),i.push(o)}getTimesForAllAxes(e){let t=[];return e.X&&(t=t.concat(Array.from(e.X.times))),e.Y&&(t=t.concat(Array.from(e.Y.times))),e.Z&&(t=t.concat(Array.from(e.Z.times))),e.ANGLE&&(t=t.concat(Array.from(e.ANGLE.times))),e.default&&(t=t.concat(Array.from(e.default.times))),t=[...new Set(t)].sort((n,i)=>n-i),t}getValueAtTime(e,t,n){if(!e)return n;let i=e.times,s=e.values,r=e.interpolation;for(let a=0;a<i.length;a++){if(i[a]===t)return s[a];if(i[a]>t){if(a===0)return s[0];let o=a-1,c=a,h=i[o],u=i[c],d=s[o],f=s[c],p=r?r[o]:"LINEAR";if(p==="STEP")return d;if(p==="BEZIER"&&e.inTangent&&e.outTangent)return this.evaluateBezierComponent(e,o,c,h,u,t);{let m=(t-h)/(u-h);return d+m*(f-d)}}}return s[s.length-1]}evaluateBezierComponent(e,t,n,i,s,r){let a=e.values,o=e.inTangent,c=e.outTangent,h=e.inTangentStride||1,u=a[t],d=a[n],f,p,m,g;h===2?(f=c[t*2],p=c[t*2+1],m=o[n*2],g=o[n*2+1]):(f=i+(s-i)/3,p=c[t],m=s-(s-i)/3,g=o[n]);let _=(r-i)/(s-i);for(let E=0;E<8;E++){let I=_*_,L=I*_,M=1-_,C=M*M,F=C*M*i+3*C*_*f+3*M*I*m+L*s,j=3*C*(f-i)+6*M*_*(m-f)+3*I*(s-m);if(Math.abs(j)<1e-10)break;let O=F-r;if(Math.abs(O)<1e-10)break;_=_-O/j,_=Math.max(0,Math.min(1,_))}let v=_*_,b=v*_,S=1-_,w=S*S;return w*S*u+3*w*_*p+3*S*v*g+b*d}getInterpolationInfo(e){let t=["X","Y","Z","ANGLE","default"],n=null,i=!0;for(let s of t){let r=e[s];if(!r||!r.interpolation)continue;let a=r.interpolation;for(let o=0;o<a.length;o++){let c=a[o];n===null?n=c:c!==n&&(i=!1)}}return{type:n||"LINEAR",uniform:i}}applyInterpolation(e,t,n=null){if(t.type==="STEP"&&t.uniform)e.setInterpolation(xt);else if(t.type==="BEZIER"&&t.uniform&&n){let i=n.default;i&&i.inTangent&&i.outTangent&&(e.setInterpolation(yi),e.settings={inTangents:new Float32Array(i.inTangent),outTangents:new Float32Array(i.outTangent)})}}prepareAnimationData(e,t){let n=[];for(let i in e)n.push({time:parseFloat(i),value:e[i]});n.sort((i,s)=>i.time-s.time);for(let i=0;i<16;i++)this.transformAnimationData(n,i,t.elements[i]);return n}createKeyframeTracks(e,t){let n=e.keyframes,i=e.name,s=[],r=[],a=[],o=[],c=this.position,h=this.quaternion,u=this.scale,d=this.matrix;for(let f=0,p=n.length;f<p;f++){let m=n[f],g=m.time,_=m.value;d.fromArray(_).transpose(),d.decompose(c,h,u),s.push(g),r.push(c.x,c.y,c.z),a.push(h.x,h.y,h.z,h.w),o.push(u.x,u.y,u.z)}return r.length>0&&t.push(new Le(i+".position",s,r)),a.length>0&&t.push(new rt(i+".quaternion",s,a)),o.length>0&&t.push(new Le(i+".scale",s,o)),t}transformAnimationData(e,t,n){let i,s=!0,r,a;for(r=0,a=e.length;r<a;r++)i=e[r],i.value[t]===void 0?i.value[t]=null:s=!1;if(s===!0)for(r=0,a=e.length;r<a;r++)i=e[r],i.value[t]=n;else this.createMissingKeyframes(e,t)}createMissingKeyframes(e,t){let n,i;for(let s=0,r=e.length;s<r;s++){let a=e[s];if(a.value[t]===null){if(n=this.getPrev(e,s,t),i=this.getNext(e,s,t),n===null){a.value[t]=i.value[t];continue}if(i===null){a.value[t]=n.value[t];continue}this.interpolate(a,n,i,t)}}}getPrev(e,t,n){for(;t>=0;){let i=e[t];if(i.value[n]!==null)return i;t--}return null}getNext(e,t,n){for(;t<e.length;){let i=e[t];if(i.value[n]!==null)return i;t++}return null}interpolate(e,t,n,i){if(n.time-t.time===0){e.value[i]=t.value[i];return}e.value[i]=(e.time-t.time)*(n.value[i]-t.value[i])/(n.time-t.time)+t.value[i]}buildAnimationClip(e){let t=[],n=e.name,i=e.end-e.start||-1,s=e.animations;for(let r=0,a=s.length;r<a;r++){let o=this.getAnimation(s[r]);for(let c=0,h=o.length;c<h;c++)t.push(o[c])}return new hn(n,i,t)}getAnimationClip(e){return this.getBuild(this.library.clips[e],this.buildAnimationClip.bind(this))}buildController(e){let t={id:e.id},n=this.library.geometries[t.id];return e.skin!==void 0&&(t.skin=this.buildSkin(e.skin),n.sources.skinIndices=t.skin.indices,n.sources.skinWeights=t.skin.weights),t}buildSkin(e){let n={joints:[],indices:{array:[],stride:4},weights:{array:[],stride:4}},i=e.sources,s=e.vertexWeights,r=s.vcount,a=s.v,o=s.inputs.JOINT.offset,c=s.inputs.WEIGHT.offset,h=e.sources[e.joints.inputs.JOINT],u=e.sources[e.joints.inputs.INV_BIND_MATRIX],d=i[s.inputs.WEIGHT.id].array,f=0,p,m,g;for(p=0,g=r.length;p<g;p++){let v=r[p],b=[];for(m=0;m<v;m++){let S=a[f+o],w=a[f+c],T=d[w];b.push({index:S,weight:T}),f+=2}for(b.sort(_),m=0;m<4;m++){let S=b[m];S!==void 0?(n.indices.array.push(S.index),n.weights.array.push(S.weight)):(n.indices.array.push(0),n.weights.array.push(0))}}for(e.bindShapeMatrix?n.bindMatrix=new se().fromArray(e.bindShapeMatrix).transpose():n.bindMatrix=new se().identity(),p=0,g=h.array.length;p<g;p++){let v=h.array[p],b=new se().fromArray(u.array,p*u.stride).transpose();n.joints.push({name:v,boneInverse:b})}return n;function _(v,b){return b.weight-v.weight}}getController(e){return this.getBuild(this.library.controllers[e],this.buildController.bind(this))}buildImage(e){return e.build!==void 0?e.build:e.init_from}getImage(e){let t=this.library.images[e];return t!==void 0?this.getBuild(t,this.buildImage.bind(this)):(console.warn("THREE.ColladaLoader: Couldn't find image with ID:",e),null)}buildEffect(e){return e}getEffect(e){return this.getBuild(this.library.effects[e],this.buildEffect.bind(this))}getTextureLoader(e){let t,n=e.slice((e.lastIndexOf(".")-1>>>0)+2);return n=n.toLowerCase(),n==="tga"?t=this.tgaLoader:t=this.textureLoader,t}buildMaterial(e){let t=this.getEffect(e.url),n=t.profile.technique,i;switch(n.type){case"phong":case"blinn":i=new ln;break;case"lambert":i=new Ri;break;default:i=new it;break}i.name=e.name||"";let s=this;function r(h,u=null){let d=t.profile.samplers[h.id],f=null;if(d!==void 0){let p=t.profile.surfaces[d.source];f=s.getImage(p.init_from)}else console.warn("THREE.ColladaLoader: Undefined sampler. Access image directly (see #12530)."),f=s.getImage(h.id);if(f!==null){let p=s.getTextureLoader(f);if(p!==void 0){let m=p.load(f),g=h.extra;if(g!==void 0&&g.technique!==void 0&&s.isEmpty(g.technique)===!1){let _=g.technique;m.wrapS=_.wrapU?Ge:Ke,m.wrapT=_.wrapV?Ge:Ke,m.offset.set(_.offsetU||0,_.offsetV||0),m.repeat.set(_.repeatU||1,_.repeatV||1)}else m.wrapS=Ge,m.wrapT=Ge;return u!==null&&(m.colorSpace=u),m}else return console.warn("THREE.ColladaLoader: Loader for texture %s not found.",f),null}else return console.warn("THREE.ColladaLoader: Couldn't create texture with ID:",h.id),null}let a=n.parameters;for(let h in a){let u=a[h];switch(h){case"diffuse":u.color&&i.color.fromArray(u.color),u.texture&&(i.map=r(u.texture,fe));break;case"specular":u.color&&i.specular&&i.specular.fromArray(u.color),u.texture&&(i.specularMap=r(u.texture));break;case"bump":u.texture&&(i.normalMap=r(u.texture));break;case"ambient":u.texture&&(i.lightMap=r(u.texture,fe));break;case"shininess":u.float&&i.shininess&&(i.shininess=u.float);break;case"emission":u.color&&i.emissive&&i.emissive.fromArray(u.color),u.texture&&(i.emissiveMap=r(u.texture,fe));break}}Ie.colorSpaceToWorking(i.color,fe),i.specular&&Ie.colorSpaceToWorking(i.specular,fe),i.emissive&&Ie.colorSpaceToWorking(i.emissive,fe);let o=a.transparent,c=a.transparency;if(c===void 0&&o&&(c={float:1}),o===void 0&&c&&(o={opaque:"A_ONE",data:{color:[1,1,1,1]}}),o&&c)if(o.data.texture)i.transparent=!0;else{let h=o.data.color;switch(o.opaque){case"A_ONE":i.opacity=h[3]*c.float;break;case"RGB_ZERO":i.opacity=1-h[0]*c.float;break;case"A_ZERO":i.opacity=1-h[3]*c.float;break;case"RGB_ONE":i.opacity=h[0]*c.float;break;default:console.warn('THREE.ColladaLoader: Invalid opaque type "%s" of transparent tag.',o.opaque)}i.opacity<1&&(i.transparent=!0)}if(n.extra!==void 0&&n.extra.technique!==void 0){let h=n.extra.technique;for(let u in h){let d=h[u];switch(u){case"double_sided":i.side=d===1?Pt:In;break;case"bump":i.normalMap=r(d.texture),i.normalScale=new pe(1,1);break}}}return i}getMaterial(e){return this.getBuild(this.library.materials[e],this.buildMaterial.bind(this))}buildCamera(e){let t;switch(e.optics.technique){case"perspective":t=new It(e.optics.parameters.yfov,e.optics.parameters.aspect_ratio,e.optics.parameters.znear,e.optics.parameters.zfar);break;case"orthographic":let n=e.optics.parameters.ymag,i=e.optics.parameters.xmag,s=e.optics.parameters.aspect_ratio;i=i===void 0?n*s:i,n=n===void 0?i/s:n,i*=.5,n*=.5,t=new un(-i,i,n,-n,e.optics.parameters.znear,e.optics.parameters.zfar);break;default:t=new It;break}return t.name=e.name||"",t}getCamera(e){let t=this.library.cameras[e];return t!==void 0?this.getBuild(t,this.buildCamera.bind(this)):(console.warn("THREE.ColladaLoader: Couldn't find camera with ID:",e),null)}buildLight(e){let t;switch(e.technique){case"directional":t=new Cn;break;case"point":t=new Rn;break;case"spot":t=new En;break;case"ambient":t=new Ni;break}return e.parameters.color&&t.color.copy(e.parameters.color),e.parameters.distance&&(t.distance=e.parameters.distance),e.parameters.falloffAngle&&(t.angle=Ue.degToRad(e.parameters.falloffAngle)),t}getLight(e){let t=this.library.lights[e];return t!==void 0?this.getBuild(t,this.buildLight.bind(this)):(console.warn("THREE.ColladaLoader: Couldn't find light with ID:",e),null)}groupPrimitives(e){let t={};for(let n=0;n<e.length;n++){let i=e[n];t[i.type]===void 0&&(t[i.type]=[]),t[i.type].push(i)}return t}checkUVCoordinates(e){let t=0;for(let n=0,i=e.length;n<i;n++)e[n].hasUV===!0&&t++;t>0&&t<e.length&&(e.uvsNeedsFix=!0)}buildGeometry(e){let t={},n=e.sources,i=e.vertices,s=e.primitives;if(s.length===0)return{};let r=this.groupPrimitives(s);for(let a in r){let o=r[a];this.checkUVCoordinates(o),t[a]=this.buildGeometryType(o,n,i)}return t}buildGeometryType(e,t,n){let i={},s={array:[],stride:0},r={array:[],stride:0},a={array:[],stride:0},o={array:[],stride:0},c={array:[],stride:0},h={array:[],stride:4},u={array:[],stride:4},d=new Te,f=[],p=0;for(let m=0;m<e.length;m++){let g=e[m],_=g.inputs,v=0;switch(g.type){case"lines":case"linestrips":v=g.count*2;break;case"triangles":v=g.count*3;break;case"polygons":case"polylist":for(let b=0;b<g.count;b++){let S=g.vcount[b];switch(S){case 3:v+=3;break;case 4:v+=6;break;default:v+=(S-2)*3;break}}break;default:console.warn("THREE.ColladaLoader: Unknown primitive type:",g.type)}d.addGroup(p,v,m),p+=v,g.material&&f.push(g.material),g.positionSource=t[n.POSITION],g.positionOffset=_.VERTEX.offset;for(let b in _){let S=_[b];switch(b){case"VERTEX":for(let w in n){let T=n[w];switch(w){case"POSITION":let E=s.array.length;if(this.buildGeometryData(g,t[T],S.offset,s.array),s.stride=t[T].stride,t.skinWeights&&t.skinIndices&&(this.buildGeometryData(g,t.skinIndices,S.offset,h.array),this.buildGeometryData(g,t.skinWeights,S.offset,u.array)),g.hasUV===!1&&e.uvsNeedsFix===!0){let I=(s.array.length-E)/s.stride;for(let L=0;L<I;L++)a.array.push(0,0)}break;case"NORMAL":this.buildGeometryData(g,t[T],S.offset,r.array),r.stride=t[T].stride;break;case"COLOR":this.buildGeometryData(g,t[T],S.offset,c.array,!0),c.stride=t[T].stride;break;case"TEXCOORD":this.buildGeometryData(g,t[T],S.offset,a.array),a.stride=t[T].stride;break;case"TEXCOORD1":this.buildGeometryData(g,t[T],S.offset,o.array),a.stride=t[T].stride;break;default:console.warn('THREE.ColladaLoader: Semantic "%s" not handled in geometry build process.',w)}}break;case"NORMAL":this.buildGeometryData(g,t[S.id],S.offset,r.array),r.stride=t[S.id].stride;break;case"COLOR":this.buildGeometryData(g,t[S.id],S.offset,c.array,!0),c.stride=t[S.id].stride;break;case"TEXCOORD":this.buildGeometryData(g,t[S.id],S.offset,a.array),a.stride=t[S.id].stride;break;case"TEXCOORD1":this.buildGeometryData(g,t[S.id],S.offset,o.array),o.stride=t[S.id].stride;break}}}return s.array.length>0&&d.setAttribute("position",new ve(s.array,s.stride)),r.array.length>0&&d.setAttribute("normal",new ve(r.array,r.stride)),c.array.length>0&&d.setAttribute("color",new ve(c.array,c.stride)),a.array.length>0&&d.setAttribute("uv",new ve(a.array,a.stride)),o.array.length>0&&d.setAttribute("uv1",new ve(o.array,o.stride)),h.array.length>0&&d.setAttribute("skinIndex",new ve(h.array,h.stride)),u.array.length>0&&d.setAttribute("skinWeight",new ve(u.array,u.stride)),i.data=d,i.type=e[0].type,i.materialKeys=f,i}buildGeometryData(e,t,n,i,s=!1){let r=e.p,a=e.stride,o=e.vcount,c=e.positionSource,h=e.positionOffset,u=this.tempColor;function d(m){let g=r[m+n]*p,_=g+p;for(;g<_;g++)i.push(f[g]);if(s){let v=i.length-p;u.setRGB(i[v+0],i[v+1],i[v+2],fe),i[v+0]=u.r,i[v+1]=u.g,i[v+2]=u.b}}let f=t.array,p=t.stride;if(e.vcount!==void 0){let m=0;for(let g=0,_=o.length;g<_;g++){let v=o[g];if(v===4){let b=m+a*0,S=m+a*1,w=m+a*2,T=m+a*3;d(b),d(S),d(T),d(S),d(w),d(T)}else if(v===3){let b=m+a*0,S=m+a*1,w=m+a*2;d(b),d(S),d(w)}else if(v>4){let b=[];for(let L=0;L<v;L++){let M=m+a*L+h,C=r[M]*c.stride,y=c.array[C],F=c.array[C+1],j=c.array[C+2];b.push(new U(y,F,j))}let S=new U,w=new Tt;w.a=b[0],w.b=b[1],w.c=b[2],w.getNormal(S);let T=[];if(Math.abs(S.x)>Math.abs(S.y)&&Math.abs(S.x)>Math.abs(S.z))for(let L=0;L<v;L++)T.push(new pe(b[L].y,b[L].z));else if(Math.abs(S.y)>Math.abs(S.z))for(let L=0;L<v;L++)T.push(new pe(b[L].x,b[L].z));else for(let L=0;L<v;L++)T.push(new pe(b[L].x,b[L].y));let E=$n.isClockWise(T);E===!0&&T.reverse();let I=$n.triangulateShape(T,[]);for(let L=0;L<I.length;L++){let M=I[L],C,y,F;E===!1?(C=M[0],y=M[1],F=M[2]):(C=v-1-M[0],y=v-1-M[2],F=v-1-M[1]);let j=m+a*C,O=m+a*y,G=m+a*F;d(j),d(O),d(G)}}m+=a*v}}else for(let m=0,g=r.length;m<g;m+=a)d(m)}getGeometry(e){return this.getBuild(this.library.geometries[e],this.buildGeometry.bind(this))}buildKinematicsModel(e){return e.build!==void 0?e.build:e}getKinematicsModel(e){return this.getBuild(this.library.kinematicsModels[e],this.buildKinematicsModel.bind(this))}buildKinematicsScene(e){return e.build!==void 0?e.build:e}getKinematicsScene(e){return this.getBuild(this.library.kinematicsScenes[e],this.buildKinematicsScene.bind(this))}setupKinematics(){let e=Object.keys(this.library.kinematicsModels)[0],t=Object.keys(this.library.kinematicsScenes)[0],n=Object.keys(this.library.visualScenes)[0];if(e===void 0||t===void 0)return;let i=this.getKinematicsModel(e),s=this.getKinematicsScene(t),r=this.getVisualScene(n),a=s.bindJointAxis,o={},c=this.collada,h=this;for(let p=0,m=a.length;p<m;p++){let g=a[p],_=c.querySelector('[sid="'+g.target+'"]');if(_){let v=_.parentElement;u(g.jointIndex,v)}}function u(p,m){let g=m.getAttribute("name"),_=i.joints[p],v=h.buildTransformList(m);r.traverse(function(b){b.name===g&&(o[p]={object:b,transforms:v,joint:_,position:_.zeroPosition})})}let d=new se,f=this.matrix;this.kinematics={joints:i&&i.joints,getJointValue:function(p){let m=o[p];if(m)return m.position;console.warn("THREE.ColladaLoader: Joint "+p+" doesn't exist.")},setJointValue:function(p,m){let g=o[p];if(g){let _=g.joint;if(m>_.limits.max||m<_.limits.min)console.warn("THREE.ColladaLoader: Joint "+p+" value "+m+" outside of limits (min: "+_.limits.min+", max: "+_.limits.max+").");else if(_.static)console.warn("THREE.ColladaLoader: Joint "+p+" is static.");else{let v=g.object,b=_.axis,S=g.transforms;f.identity();for(let w=0;w<S.length;w++){let T=S[w];if(T.sid&&T.sid.indexOf(p)!==-1)switch(_.type){case"revolute":f.multiply(d.makeRotationAxis(b,Ue.degToRad(m)));break;case"prismatic":f.multiply(d.makeTranslation(b.x*m,b.y*m,b.z*m));break;default:console.warn("THREE.ColladaLoader: Unknown joint type: "+_.type);break}else switch(T.type){case"matrix":f.multiply(T.obj);break;case"translate":f.multiply(d.makeTranslation(T.obj.x,T.obj.y,T.obj.z));break;case"scale":f.scale(T.obj);break;case"rotate":f.multiply(d.makeRotationAxis(T.obj,T.angle));break}}v.matrix.copy(f),v.matrix.decompose(v.position,v.quaternion,v.scale),o[p].position=m}}else console.warn("THREE.ColladaLoader: Joint "+p+" does not exist.")}}}buildTransformList(e){let t=[],n=this.collada.querySelector('[id="'+e.id+'"]');for(let i=0;i<n.childNodes.length;i++){let s=n.childNodes[i];if(s.nodeType!==1)continue;let r,a;switch(s.nodeName){case"matrix":r=We(s.textContent);let o=new se().fromArray(r).transpose();t.push({sid:s.getAttribute("sid"),type:s.nodeName,obj:o});break;case"translate":case"scale":r=We(s.textContent),a=new U().fromArray(r),t.push({sid:s.getAttribute("sid"),type:s.nodeName,obj:a});break;case"rotate":r=We(s.textContent),a=new U().fromArray(r);let c=Ue.degToRad(r[3]);t.push({sid:s.getAttribute("sid"),type:s.nodeName,obj:a,angle:c});break}}return t}buildSkeleton(e,t){let n=[],i=[],s,r,a;for(s=0;s<e.length;s++){let h=e[s],u;if(this.hasNode(h))u=this.getNode(h),this.buildBoneHierarchy(u,t,n);else if(this.hasVisualScene(h)){let f=this.library.visualScenes[h].children;for(let p=0;p<f.length;p++){let m=f[p];if(m.type==="JOINT"){let g=this.getNode(m.id);this.buildBoneHierarchy(g,t,n)}}}else console.error("THREE.ColladaLoader: Unable to find root bone of skeleton with ID:",h)}for(s=0;s<t.length;s++)for(r=0;r<n.length;r++)if(a=n[r],a.bone.name===t[s].name){i[s]=a,a.processed=!0;break}for(s=0;s<n.length;s++)a=n[s],a.processed===!1&&(i.push(a),a.processed=!0);let o=[],c=[];for(s=0;s<i.length;s++)a=i[s],o.push(a.bone),c.push(a.boneInverse);return new Mn(o,c)}buildBoneHierarchy(e,t,n){e.traverse(function(i){if(i.isBone===!0){let s;for(let r=0;r<t.length;r++){let a=t[r];if(a.name===i.name){s=a.boneInverse;break}}s===void 0&&(s=new se),n.push({bone:i,boneInverse:s,processed:!1})}})}buildNode(e){let t=[],n=e.matrix,i=e.nodes,s=e.type,r=e.instanceCameras,a=e.instanceControllers,o=e.instanceLights,c=e.instanceGeometries,h=e.instanceNodes;for(let d=0,f=i.length;d<f;d++)t.push(this.getNode(i[d]));for(let d=0,f=r.length;d<f;d++){let p=this.getCamera(r[d]);p!==null&&t.push(p.clone())}for(let d=0,f=a.length;d<f;d++){let p=a[d],m=this.getController(p.id),g=this.getGeometry(m.id),_=this.buildObjects(g,p.materials),v=p.skeletons,b=m.skin.joints,S=this.buildSkeleton(v,b);for(let w=0,T=_.length;w<T;w++){let E=_[w];E.isSkinnedMesh&&(E.bind(S,m.skin.bindMatrix),E.normalizeSkinWeights()),t.push(E)}}for(let d=0,f=o.length;d<f;d++){let p=this.getLight(o[d]);p!==null&&t.push(p.clone())}for(let d=0,f=c.length;d<f;d++){let p=c[d],m=this.getGeometry(p.id),g=this.buildObjects(m,p.materials);for(let _=0,v=g.length;_<v;_++)t.push(g[_])}for(let d=0,f=h.length;d<f;d++)t.push(this.getNode(h[d]).clone());let u;if(i.length===0&&t.length===1)u=t[0];else{u=s==="JOINT"?new on:new He;for(let d=0;d<t.length;d++)u.add(t[d])}return u.name=s==="JOINT"?e.sid:e.name,s!=="JOINT"&&this.hasPivotTransforms(e)?this.wrapWithTransformHierarchy(u,e):(u.matrix.copy(n),u.matrix.decompose(u.position,u.quaternion,u.scale),u)}wrapWithTransformHierarchy(e,t){let n=t.id;this.transformNodes[n]={};let i=t.transformOrder,s=t.transformData,r=new He;r.name=t.name;let a=r;for(let o=0;o<i.length;o++){let c=i[o],h=s[c],u=new He;switch(u.name=t.name+"_"+c,h.type){case"translate":u.position.set(h.x,h.y,h.z);break;case"rotate":{let d=new U(h.axis[0],h.axis[1],h.axis[2]),f=Ue.degToRad(h.angle);u.quaternion.setFromAxisAngle(d,f),u.userData.rotationAxis=d;break}case"scale":u.scale.set(h.x,h.y,h.z);break;case"matrix":{new se().fromArray(h.array).transpose().decompose(u.position,u.quaternion,u.scale);break}}this.transformNodes[n][c]=u,a.add(u),a=u}return a.add(e),r}resolveMaterialBinding(e,t){let n=[];for(let i=0,s=e.length;i<s;i++){let r=t[e[i]];r===void 0?(console.warn("THREE.ColladaLoader: Material with key %s not found. Apply fallback material.",e[i]),n.push(this.fallbackMaterial)):n.push(this.getMaterial(r))}return n}get fallbackMaterial(){return this._fallbackMaterial===void 0&&(this._fallbackMaterial=new it({name:De.DEFAULT_MATERIAL_NAME,color:16711935})),this._fallbackMaterial}buildObjects(e,t){let n=[];for(let i in e){let s=e[i],r=this.resolveMaterialBinding(s.materialKeys,t);if(r.length===0&&(i==="lines"||i==="linestrips"?r.push(new st):r.push(new ln)),i==="lines"||i==="linestrips")for(let h=0,u=r.length;h<u;h++){let d=r[h];if(d.isMeshPhongMaterial===!0||d.isMeshLambertMaterial===!0){let f=new st;f.color.copy(d.color),f.opacity=d.opacity,f.transparent=d.transparent,r[h]=f}}let a=s.data.attributes.skinIndex!==void 0,o=r.length===1?r[0]:r,c;switch(i){case"lines":c=new Rt(s.data,o);break;case"linestrips":c=new Xt(s.data,o);break;case"triangles":case"polygons":case"polylist":a?c=new bn(s.data,o):c=new Be(s.data,o);break}n.push(c)}return n}hasNode(e){return this.library.nodes[e]!==void 0}getNode(e){return this.getBuild(this.library.nodes[e],this.buildNode.bind(this))}buildVisualScene(e){let t=new He;t.name=e.name;let n=e.children;for(let i=0;i<n.length;i++){let s=n[i];t.add(this.getNode(s.id))}return t}hasVisualScene(e){return this.library.visualScenes[e]!==void 0}getVisualScene(e){return this.getBuild(this.library.visualScenes[e],this.buildVisualScene.bind(this))}parseScene(e){let t=$e(e,"instance_visual_scene")[0];return this.getVisualScene(this.parseId(t.getAttribute("url")))}parseId(e){return e.substring(1)}setupAnimations(){let e=this.library.clips;if(this.isEmpty(e)===!0){if(this.isEmpty(this.library.animations)===!1){let t=[];for(let n in this.library.animations){let i=this.getAnimation(n);for(let s=0,r=i.length;s<r;s++)t.push(i[s])}this.buildDeferredPivotAnimationTracks(t),this.animations.push(new hn("default",-1,t))}}else for(let t in e)this.animations.push(this.getAnimationClip(t))}buildDeferredPivotAnimationTracks(e){for(let t in this.deferredPivotAnimations){let n=this.library.nodes[t];if(!n)continue;let i=this.deferredPivotAnimations[t];this.buildTransformHierarchyTracks(t,i,n,e)}}buildTransformHierarchyTracks(e,t,n,i){let s=this.transformNodes[e];if(!s){console.warn("THREE.ColladaLoader: Transform hierarchy not found for node:",e);return}for(let r in t){let a=s[r];if(!a)continue;let o=n.transforms[r],c=n.transformData[r],h=t[r];switch(o){case"translate":this.buildHierarchyTranslateTrack(a,h,c,i);break;case"rotate":this.buildHierarchyRotateTrack(a,h,c,i);break;case"scale":this.buildHierarchyScaleTrack(a,h,c,i);break}}}buildHierarchyTranslateTrack(e,t,n,i){if(t.default&&t.default.stride===3){let c=t.default,h=new Le(e.uuid+".position",Array.from(c.times),Array.from(c.values)),u=this.getInterpolationInfo(t);this.applyInterpolation(h,u,t),i.push(h);return}let s=this.getTimesForAllAxes(t);if(s.length===0)return;let r=[],a=this.getInterpolationInfo(t);for(let c=0;c<s.length;c++){let h=s[c],u=this.getValueAtTime(t.X,h,n.x),d=this.getValueAtTime(t.Y,h,n.y),f=this.getValueAtTime(t.Z,h,n.z);r.push(u,d,f)}let o=new Le(e.uuid+".position",s,r);this.applyInterpolation(o,a),i.push(o)}buildHierarchyRotateTrack(e,t,n,i){let s=t.ANGLE||t.default;if(!s)return;let r=Array.from(s.times);if(r.length===0)return;let a=e.userData.rotationAxis||new U(n.axis[0],n.axis[1],n.axis[2]),o=new Ee,c=new Ee,h=[],u=this.getInterpolationInfo(t);for(let f=0;f<r.length;f++){let p=r[f],m=this.getValueAtTime(s,p,n.angle),g=Ue.degToRad(m);o.setFromAxisAngle(a,g),f>0&&c.dot(o)<0&&(o.x=-o.x,o.y=-o.y,o.z=-o.z,o.w=-o.w),c.copy(o),h.push(o.x,o.y,o.z,o.w)}let d=new rt(e.uuid+".quaternion",r,h);this.applyInterpolation(d,u),i.push(d)}buildHierarchyScaleTrack(e,t,n,i){if(t.default&&t.default.stride===3){let c=t.default,h=new Le(e.uuid+".scale",Array.from(c.times),Array.from(c.values)),u=this.getInterpolationInfo(t);this.applyInterpolation(h,u,t),i.push(h);return}let s=this.getTimesForAllAxes(t);if(s.length===0)return;let r=[],a=this.getInterpolationInfo(t);for(let c=0;c<s.length;c++){let h=s[c],u=this.getValueAtTime(t.X,h,n.x),d=this.getValueAtTime(t.Y,h,n.y),f=this.getValueAtTime(t.Z,h,n.z);r.push(u,d,f)}let o=new Le(e.uuid+".scale",s,r);this.applyInterpolation(o,a),i.push(o)}};var Vi=class extends De{load(e,t,n,i){let s=this,r=s.path===""?bt.extractUrlBase(e):s.path,a=new at(s.manager);a.setPriority(s.priority),a.setCache(s.cache),a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(o){try{t(s.parse(o,r))}catch(c){i?i(c):console.error(c),s.manager.itemError(e)}},n,i)}parse(e,t){if(e.length===0)return{scene:new Et};let i=new Vs().parse(e);if(i===null)return null;let{library:s,asset:r,collada:a}=i,o=new Tn(this.manager);o.setPriority(this.priority),o.setCache(this.cache),o.setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);let c;Hi&&(c=new Hi(this.manager),c.setPriority(this.priority),c.setCache(this.cache),c.setPath(this.resourcePath||t),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials));let h=new Ws(s,a,o,c),{scene:u,animations:d,kinematics:f}=h.compose();return u.animations=d,r.upAxis==="Z_UP"&&(console.warn("THREE.ColladaLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted, see #24289."),u.rotation.set(-Math.PI/2,0,0)),u.scale.multiplyScalar(r.unit),{get animations(){return console.warn("THREE.ColladaLoader: Please access animations over scene.animations now."),d},kinematics:f,library:s,scene:u}}};var Xs=class extends De{constructor(e){super(e)}load(e,t,n,i){let s=this,r=new at(this.manager);r.setPriority(this.priority),r.setCache(this.cache),r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,function(a){try{t(s.parse(a))}catch(o){i?i(o):console.error(o),s.manager.itemError(e)}},n,i)}parse(e){function t(c){let h=new DataView(c),u=32/8*3+32/8*3*3+16/8,d=h.getUint32(80,!0);if(80+32/8+d*u===h.byteLength)return!0;let p=[115,111,108,105,100];for(let m=0;m<5;m++)if(n(p,h,m))return!1;return!0}function n(c,h,u){for(let d=0,f=c.length;d<f;d++)if(c[d]!==h.getUint8(u+d))return!1;return!0}function i(c){let h=new DataView(c),u=h.getUint32(80,!0),d,f,p,m=!1,g,_,v,b,S;for(let C=0;C<=70;C++)h.getUint32(C,!1)==1129270351&&h.getUint8(C+4)==82&&h.getUint8(C+5)==61&&(m=!0,g=new Float32Array(u*3*3),_=h.getUint8(C+6)/255,v=h.getUint8(C+7)/255,b=h.getUint8(C+8)/255,S=h.getUint8(C+9)/255);let w=84,T=50,E=new Te,I=new Float32Array(u*3*3),L=new Float32Array(u*3*3),M=new ae;for(let C=0;C<u;C++){let y=w+C*T,F=h.getFloat32(y,!0),j=h.getFloat32(y+4,!0),O=h.getFloat32(y+8,!0);if(m){let G=h.getUint16(y+48,!0);(G&32768)===0?(d=(G&31)/31,f=(G>>5&31)/31,p=(G>>10&31)/31):(d=_,f=v,p=b)}for(let G=1;G<=3;G++){let k=y+G*12,Y=C*3*3+(G-1)*3;I[Y]=h.getFloat32(k,!0),I[Y+1]=h.getFloat32(k+4,!0),I[Y+2]=h.getFloat32(k+8,!0),L[Y]=F,L[Y+1]=j,L[Y+2]=O,m&&(M.setRGB(d,f,p,fe),g[Y]=M.r,g[Y+1]=M.g,g[Y+2]=M.b)}}return E.setAttribute("position",new xe(I,3)),E.setAttribute("normal",new xe(L,3)),m&&(E.setAttribute("color",new xe(g,3)),E.hasColors=!0,E.alpha=S),E}function s(c){let h=new Te,u=/solid([\s\S]*?)endsolid/g,d=/facet([\s\S]*?)endfacet/g,f=/solid\s(.+)/,p=0,m=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,g=new RegExp("vertex"+m+m+m,"g"),_=new RegExp("normal"+m+m+m,"g"),v=[],b=[],S=[],w=new U,T,E=0,I=0,L=0;for(;(T=u.exec(c))!==null;){I=L;let M=T[0],C=(T=f.exec(M))!==null?T[1]:"";for(S.push(C);(T=d.exec(M))!==null;){let j=0,O=0,G=T[0];for(;(T=_.exec(G))!==null;)w.x=parseFloat(T[1]),w.y=parseFloat(T[2]),w.z=parseFloat(T[3]),O++;for(;(T=g.exec(G))!==null;)v.push(parseFloat(T[1]),parseFloat(T[2]),parseFloat(T[3])),b.push(w.x,w.y,w.z),j++,L++;O!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+p),j!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+p),p++}let y=I,F=L-I;h.userData.groupNames=S,h.addGroup(y,F,E),E++}return h.setAttribute("position",new ve(v,3)),h.setAttribute("normal",new ve(b,3)),h}function r(c){return typeof c!="string"?new TextDecoder().decode(c):c}function a(c){if(typeof c=="string"){let h=new Uint8Array(c.length);for(let u=0;u<c.length;u++)h[u]=c.charCodeAt(u)&255;return h.buffer||h}else return c}let o=a(e);return t(o)?i(o):s(r(e))}};var mf=/^[og]\s*(.+)?/,gf=/^mtllib /,_f=/^usemtl /,xf=/^usemap /,qs=/\s+/,Nc=new U,Oa=new U,Lc=new U,Dc=new U,ft=new U,Ys=new ae;function yf(){let l={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}let n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(i,s){let r=this._finalize(!1);r&&(r.inherited||r.groupCount<=0)&&this.materials.splice(r.index,1);let a={index:this.materials.length,name:i||"",mtllib:Array.isArray(s)&&s.length>0?s[s.length-1]:"",smooth:r!==void 0?r.smooth:this.smooth,groupStart:r!==void 0?r.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(o){let c={index:typeof o=="number"?o:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return c.clone=this.clone.bind(c),c}};return this.materials.push(a),a},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(i){let s=this.currentMaterial();if(s&&s.groupEnd===-1&&(s.groupEnd=this.geometry.vertices.length/3,s.groupCount=s.groupEnd-s.groupStart,s.inherited=!1),i&&this.materials.length>1)for(let r=this.materials.length-1;r>=0;r--)this.materials[r].groupCount<=0&&this.materials.splice(r,1);return i&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),s}},n&&n.name&&typeof n.clone=="function"){let i=n.clone(0);i.inherited=!0,this.object.materials.push(i)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseNormalIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseUVIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/2)*2},addVertex:function(e,t,n){let i=this.vertices,s=this.object.geometry.vertices;s.push(i[e+0],i[e+1],i[e+2]),s.push(i[t+0],i[t+1],i[t+2]),s.push(i[n+0],i[n+1],i[n+2])},addVertexPoint:function(e){let t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){let t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){let i=this.normals,s=this.object.geometry.normals;s.push(i[e+0],i[e+1],i[e+2]),s.push(i[t+0],i[t+1],i[t+2]),s.push(i[n+0],i[n+1],i[n+2])},addFaceNormal:function(e,t,n){let i=this.vertices,s=this.object.geometry.normals;Nc.fromArray(i,e),Oa.fromArray(i,t),Lc.fromArray(i,n),ft.subVectors(Lc,Oa),Dc.subVectors(Nc,Oa),ft.cross(Dc),ft.normalize(),s.push(ft.x,ft.y,ft.z),s.push(ft.x,ft.y,ft.z),s.push(ft.x,ft.y,ft.z)},addColor:function(e,t,n){let i=this.colors,s=this.object.geometry.colors;i[e]!==void 0&&s.push(i[e+0],i[e+1],i[e+2]),i[t]!==void 0&&s.push(i[t+0],i[t+1],i[t+2]),i[n]!==void 0&&s.push(i[n+0],i[n+1],i[n+2])},addUV:function(e,t,n){let i=this.uvs,s=this.object.geometry.uvs;s.push(i[e+0],i[e+1]),s.push(i[t+0],i[t+1]),s.push(i[n+0],i[n+1])},addDefaultUV:function(){let e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){let t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,n,i,s,r,a,o,c){let h=this.vertices.length,u=this.parseVertexIndex(e,h),d=this.parseVertexIndex(t,h),f=this.parseVertexIndex(n,h);if(this.addVertex(u,d,f),this.addColor(u,d,f),a!==void 0&&a!==""){let p=this.normals.length;u=this.parseNormalIndex(a,p),d=this.parseNormalIndex(o,p),f=this.parseNormalIndex(c,p),this.addNormal(u,d,f)}else this.addFaceNormal(u,d,f);if(i!==void 0&&i!==""){let p=this.uvs.length;u=this.parseUVIndex(i,p),d=this.parseUVIndex(s,p),f=this.parseUVIndex(r,p),this.addUV(u,d,f),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";let t=this.vertices.length;for(let n=0,i=e.length;n<i;n++){let s=this.parseVertexIndex(e[n],t);this.addVertexPoint(s),this.addColor(s)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";let n=this.vertices.length,i=this.uvs.length;for(let s=0,r=e.length-1;s<r;s++)this.addVertexLine(this.parseVertexIndex(e[s],n)),this.addVertexLine(this.parseVertexIndex(e[s+1],n));for(let s=0,r=t.length-1;s<r;s++)this.addUVLine(this.parseUVIndex(t[s],i)),this.addUVLine(this.parseUVIndex(t[s+1],i))}};return l.startObject("",!1),l}var Zs=class extends De{constructor(e){super(e),this.materials=null}load(e,t,n,i){let s=this,r=new at(this.manager);r.setPriority(this.priority),r.setCache(this.cache),r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,function(a){try{t(s.parse(a))}catch(o){i?i(o):console.error(o),s.manager.itemError(e)}},n,i)}setMaterials(e){return this.materials=e,this}parse(e){let t=new yf;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));let n=e.split(`
`),i=[];for(let a=0,o=n.length;a<o;a++){let c=n[a].trimStart();if(c.length===0)continue;let h=c.charAt(0);if(h!=="#")if(h==="v"){let u=c.split(qs);switch(u[0]){case"v":t.vertices.push(parseFloat(u[1]),parseFloat(u[2]),parseFloat(u[3])),u.length>=7?(Ys.setRGB(parseFloat(u[4]),parseFloat(u[5]),parseFloat(u[6]),fe),t.colors.push(Ys.r,Ys.g,Ys.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(u[1]),parseFloat(u[2]),parseFloat(u[3]));break;case"vt":t.uvs.push(parseFloat(u[1]),parseFloat(u[2]));break}}else if(h==="f"){let d=c.slice(1).trim().split(qs),f=[];for(let m=0,g=d.length;m<g;m++){let _=d[m];if(_.length>0){let v=_.split("/");f.push(v)}}let p=f[0];for(let m=1,g=f.length-1;m<g;m++){let _=f[m],v=f[m+1];t.addFace(p[0],_[0],v[0],p[1],_[1],v[1],p[2],_[2],v[2])}}else if(h==="l"){let u=c.substring(1).trim().split(qs),d=[],f=[];if(c.indexOf("/")===-1)d=u;else for(let p=0,m=u.length;p<m;p++){let g=u[p].split("/");g[0]!==""&&d.push(g[0]),g[1]!==""&&f.push(g[1])}t.addLineGeometry(d,f)}else if(h==="p"){let d=c.slice(1).trim().split(qs);t.addPointGeometry(d)}else if((i=mf.exec(c))!==null){let u=(" "+i[0].slice(1).trim()).slice(1);t.startObject(u)}else if(_f.test(c))t.object.startMaterial(c.substring(7).trim(),t.materialLibraries);else if(gf.test(c))t.materialLibraries.push(c.substring(7).trim());else if(xf.test(c))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(h==="s"){if(i=c.split(" "),i.length>1){let d=i[1].trim().toLowerCase();t.object.smooth=d!=="0"&&d!=="off"}else t.object.smooth=!0;let u=t.object.currentMaterial();u&&(u.smooth=t.object.smooth)}else{if(c==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+c+'"')}}t.finalize();let s=new He;if(s.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let a=0,o=t.objects.length;a<o;a++){let c=t.objects[a],h=c.geometry,u=c.materials,d=h.type==="Line",f=h.type==="Points",p=!1;if(h.vertices.length===0)continue;let m=new Te;m.setAttribute("position",new ve(h.vertices,3)),h.normals.length>0&&m.setAttribute("normal",new ve(h.normals,3)),h.colors.length>0&&(p=!0,m.setAttribute("color",new ve(h.colors,3))),h.hasUVIndices===!0&&m.setAttribute("uv",new ve(h.uvs,2));let g=[];for(let v=0,b=u.length;v<b;v++){let S=u[v],w=S.name+"_"+S.smooth+"_"+p,T=t.materials[w];if(this.materials!==null){if(T=this.materials.create(S.name),d&&T&&!(T instanceof st)){let E=new st;Ve.prototype.copy.call(E,T),E.color.copy(T.color),T=E}else if(f&&T&&!(T instanceof vt)){let E=new vt({size:10,sizeAttenuation:!1});Ve.prototype.copy.call(E,T),E.color.copy(T.color),E.map=T.map,T=E}}T===void 0&&(d?T=new st:f?T=new vt({size:1,sizeAttenuation:!1}):T=new ln,T.name=S.name,T.flatShading=!S.smooth,T.vertexColors=p,t.materials[w]=T),g.push(T)}let _;if(g.length>1){for(let v=0,b=u.length;v<b;v++){let S=u[v];m.addGroup(S.groupStart,S.groupCount,v)}d?_=new Rt(m,g):f?_=new qt(m,g):_=new Be(m,g)}else d?_=new Rt(m,g[0]):f?_=new qt(m,g[0]):_=new Be(m,g[0]);_.name=c.name,s.add(_)}else if(t.vertices.length>0){let a=new vt({size:1,sizeAttenuation:!1}),o=new Te;o.setAttribute("position",new ve(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(o.setAttribute("color",new ve(t.colors,3)),a.vertexColors=!0);let c=new qt(o,a);s.add(c)}return s}};var Uc={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]},fn=class{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(e){return new Ga(e)}),this.register(function(e){return new Ha(e)}),this.register(function(e){return new qa(e)}),this.register(function(e){return new Ya(e)}),this.register(function(e){return new Za(e)}),this.register(function(e){return new Ka(e)}),this.register(function(e){return new Va(e)}),this.register(function(e){return new Wa(e)}),this.register(function(e){return new Xa(e)}),this.register(function(e){return new ja(e)}),this.register(function(e){return new Ja(e)}),this.register(function(e){return new $a(e)}),this.register(function(e){return new Qa(e)}),this.register(function(e){return new eo(e)})}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}setTextureUtils(e){return this.textureUtils=e,this}parse(e,t,n,i){let s=new za,r=[];for(let a=0,o=this.pluginCallbacks.length;a<o;a++)r.push(this.pluginCallbacks[a](s));s.setPlugins(r),s.setTextureUtils(this.textureUtils),s.writeAsync(e,t,i).catch(n)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,i,s,t)})}},de={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},Fa="KHR_mesh_quantization",ot={};ot[rn]=de.NEAREST;ot[Ui]=de.NEAREST_MIPMAP_NEAREST;ot[Oi]=de.NEAREST_MIPMAP_LINEAR;ot[_t]=de.LINEAR;ot[Fi]=de.LINEAR_MIPMAP_NEAREST;ot[Nt]=de.LINEAR_MIPMAP_LINEAR;ot[Ke]=de.CLAMP_TO_EDGE;ot[Ge]=de.REPEAT;ot[xn]=de.MIRRORED_REPEAT;var Oc={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},vf=new ae,Fc=12,bf=1179937895,Sf=2,Bc=8,Mf=1313821514,wf=5130562;function jt(l,e){return l.length===e.length&&l.every(function(t,n){return t===e[n]})}function Tf(l){return new TextEncoder().encode(l).buffer}function Af(l){return jt(l.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function Ef(l,e,t){let n={min:new Array(l.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(l.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let i=e;i<e+t;i++)for(let s=0;s<l.itemSize;s++){let r;l.itemSize>4?r=l.array[i*l.itemSize+s]:(s===0?r=l.getX(i):s===1?r=l.getY(i):s===2?r=l.getZ(i):s===3&&(r=l.getW(i)),l.normalized===!0&&(r=Ue.normalize(r,l.array))),n.min[s]=Math.min(n.min[s],r),n.max[s]=Math.max(n.max[s],r)}return n}function kc(l){return Math.ceil(l/4)*4}function Ba(l,e=0){let t=kc(l.byteLength);if(t!==l.byteLength){let n=new Uint8Array(t);if(n.set(new Uint8Array(l)),e!==0)for(let i=l.byteLength;i<t;i++)n[i]=e;return n.buffer}return l}function ka(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function Rf(l,e){if(typeof OffscreenCanvas<"u"&&l instanceof OffscreenCanvas){let t;return e==="image/jpeg"?t=.92:e==="image/webp"&&(t=.8),l.convertToBlob({type:e,quality:t})}else return new Promise(t=>l.toBlob(t,e))}var za=class{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r187"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map,normalMaps:new Map},this.textureUtils=null}setPlugins(e){this.plugins=e}setTextureUtils(e){this.textureUtils=e}async writeAsync(e,t,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1,copyright:null},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(e),await Promise.all(this.pending);let i=this,s=i.buffers,r=i.json;n=i.options;let a=i.extensionsUsed,o=i.extensionsRequired,c=new Blob(s,{type:"application/octet-stream"}),h=Object.keys(a),u=Object.keys(o);if(h.length>0&&(r.extensionsUsed=h),u.length>0&&(r.extensionsRequired=u),r.buffers&&r.buffers.length>0&&(r.buffers[0].byteLength=c.size),n.copyright&&(r.asset.copyright=n.copyright),n.binary===!0){let d=new FileReader;d.readAsArrayBuffer(c),d.onloadend=function(){let f=Ba(d.result),p=new DataView(new ArrayBuffer(Bc));p.setUint32(0,f.byteLength,!0),p.setUint32(4,wf,!0);let m=Ba(Tf(JSON.stringify(r)),32),g=new DataView(new ArrayBuffer(Bc));g.setUint32(0,m.byteLength,!0),g.setUint32(4,Mf,!0);let _=new ArrayBuffer(Fc),v=new DataView(_);v.setUint32(0,bf,!0),v.setUint32(4,Sf,!0);let b=Fc+g.byteLength+m.byteLength+p.byteLength+f.byteLength;v.setUint32(8,b,!0);let S=new Blob([_,g,m,p,f],{type:"application/octet-stream"}),w=new FileReader;w.readAsArrayBuffer(S),w.onloadend=function(){t(w.result)}}}else if(r.buffers&&r.buffers.length>0){let d=new FileReader;d.readAsDataURL(c),d.onloadend=function(){let f=d.result;r.buffers[0].uri=f,t(r)}}else t(r)}serializeUserData(e,t){if(Object.keys(e.userData).length===0)return;let n=this.options,i=this.extensionsUsed;try{let s=JSON.parse(JSON.stringify(e.userData));if(n.includeCustomExtensions&&s.gltfExtensions){t.extensions===void 0&&(t.extensions={});for(let r in s.gltfExtensions)t.extensions[r]=s.gltfExtensions[r],i[r]=!0;delete s.gltfExtensions}Object.keys(s).length>0&&(t.extras=s)}catch(s){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+s.message)}}getUID(e,t=!1){if(this.uids.has(e)===!1){let i=new Map;i.set(!0,this.uid++),i.set(!1,this.uid++),this.uids.set(e,i)}return this.uids.get(e).get(t)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;let n=new U;for(let i=0,s=e.count;i<s;i++)if(Math.abs(n.fromBufferAttribute(e,i).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){let t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);let n=e.clone(),i=new U;for(let s=0,r=n.count;s<r;s++)i.fromBufferAttribute(n,s),i.x===0&&i.y===0&&i.z===0?i.setX(1):i.normalize(),n.setXYZ(s,i.x,i.y,i.z);return t.attributesNormalized.set(e,n),n}applyTextureTransform(e,t){let n=!1,i={};(t.offset.x!==0||t.offset.y!==0)&&(i.offset=t.offset.toArray(),n=!0),t.rotation!==0&&(i.rotation=t.rotation,n=!0),(t.repeat.x!==1||t.repeat.y!==1)&&(i.scale=t.repeat.toArray(),n=!0),n&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=i,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(e,t){if(e===t)return e;function n(f){return f.colorSpace===fe?function(m){return m<.04045?m*.0773993808:Math.pow(m*.9478672986+.0521327014,2.4)}:function(m){return m}}e instanceof cn&&(e=await this.decompressTextureAsync(e)),t instanceof cn&&(t=await this.decompressTextureAsync(t));let i=e?e.image:null,s=t?t.image:null,r=Math.max(i?i.width:0,s?s.width:0),a=Math.max(i?i.height:0,s?s.height:0),o=ka();o.width=r,o.height=a;let c=o.getContext("2d",{willReadFrequently:!0});c.fillStyle="#00ffff",c.fillRect(0,0,r,a);let h=c.getImageData(0,0,r,a);if(i){c.drawImage(i,0,0,r,a);let f=n(e),p=c.getImageData(0,0,r,a).data;for(let m=2;m<p.length;m+=4)h.data[m]=f(p[m]/256)*256}if(s){c.drawImage(s,0,0,r,a);let f=n(t),p=c.getImageData(0,0,r,a).data;for(let m=1;m<p.length;m+=4)h.data[m]=f(p[m]/256)*256}c.putImageData(h,0,0);let d=(e||t).clone();return d.source=new yn(o),d.colorSpace=zi,d.channel=(e||t).channel,e&&t&&e.channel!==t.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),d}async buildNormalMapTextureAsync(e,t,n){e instanceof cn&&(e=await this.decompressTextureAsync(e));let i=e.image,s=ka();s.width=i.width,s.height=i.height;let r=s.getContext("2d",{willReadFrequently:!0});r.drawImage(i,0,0,s.width,s.height);let a=r.getImageData(0,0,s.width,s.height),o=a.data;for(let h=0;h<o.length;h+=4)t&&(o[h+0]=255-o[h+0]),n&&(o[h+1]=255-o[h+1]);r.putImageData(a,0,0);let c=e.clone();return c.source=new yn(s),c}async decompressTextureAsync(e,t=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(e,t)}processBuffer(e){let t=this.json,n=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),n.push(e),0}processBufferView(e,t,n,i,s){let r=this.json;r.bufferViews||(r.bufferViews=[]);let a;switch(t){case de.BYTE:case de.UNSIGNED_BYTE:a=1;break;case de.SHORT:case de.UNSIGNED_SHORT:a=2;break;default:a=4}let o=e.itemSize*a;s===de.ARRAY_BUFFER&&(o=Math.ceil(o/4)*4);let c=kc(i*o),h=new DataView(new ArrayBuffer(c)),u=0;for(let p=n;p<n+i;p++){for(let m=0;m<e.itemSize;m++){let g;e.itemSize>4?g=e.array[p*e.itemSize+m]:(m===0?g=e.getX(p):m===1?g=e.getY(p):m===2?g=e.getZ(p):m===3&&(g=e.getW(p)),e.normalized===!0&&(g=Ue.normalize(g,e.array))),t===de.FLOAT?h.setFloat32(u,g,!0):t===de.INT?h.setInt32(u,g,!0):t===de.UNSIGNED_INT?h.setUint32(u,g,!0):t===de.SHORT?h.setInt16(u,g,!0):t===de.UNSIGNED_SHORT?h.setUint16(u,g,!0):t===de.BYTE?h.setInt8(u,g):t===de.UNSIGNED_BYTE&&h.setUint8(u,g),u+=a}u%o!==0&&(u+=o-u%o)}let d={buffer:this.processBuffer(h.buffer),byteOffset:this.byteOffset,byteLength:c};return s!==void 0&&(d.target=s),s===de.ARRAY_BUFFER&&(d.byteStride=o),this.byteOffset+=c,r.bufferViews.push(d),{id:r.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){let t=this,n=t.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(i){let s=new FileReader;s.readAsArrayBuffer(e),s.onloadend=function(){let r=Ba(s.result),a={buffer:t.processBuffer(r),byteOffset:t.byteOffset,byteLength:r.byteLength};t.byteOffset+=r.byteLength,i(n.bufferViews.push(a)-1)}})}processAccessor(e,t,n,i){let s=this.json,r={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"},a;if(e.array.constructor===Float32Array)a=de.FLOAT;else if(e.array.constructor===Int32Array)a=de.INT;else if(e.array.constructor===Uint32Array)a=de.UNSIGNED_INT;else if(e.array.constructor===Int16Array)a=de.SHORT;else if(e.array.constructor===Uint16Array)a=de.UNSIGNED_SHORT;else if(e.array.constructor===Int8Array)a=de.BYTE;else if(e.array.constructor===Uint8Array)a=de.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+e.array.constructor.name);if(n===void 0&&(n=0),(i===void 0||i===1/0)&&(i=e.count),i===0)return null;let o=Ef(e,n,i),c;t!==void 0&&(c=e===t.index?de.ELEMENT_ARRAY_BUFFER:de.ARRAY_BUFFER);let h=this.processBufferView(e,a,n,i,c),u={bufferView:h.id,byteOffset:h.byteOffset,componentType:a,count:i,max:o.max,min:o.min,type:r[e.itemSize]};return e.normalized===!0&&(u.normalized=!0),s.accessors||(s.accessors=[]),s.accessors.push(u)-1}processImage(e,t,n,i="image/png"){if(e!==null){let s=this,r=s.cache,a=s.json,o=s.options,c=s.pending;r.images.has(e)||r.images.set(e,{});let h=r.images.get(e),u=i+":flipY/"+n.toString();if(h[u]!==void 0)return h[u];a.images||(a.images=[]);let d={mimeType:i},f=ka();f.width=Math.min(e.width,o.maxTextureSize),f.height=Math.min(e.height,o.maxTextureSize);let p=f.getContext("2d",{willReadFrequently:!0});if(n===!0&&(p.translate(0,f.height),p.scale(1,-1)),e.data!==void 0){t!==Bi&&console.error("GLTFExporter: Only RGBAFormat is supported.",t),(e.width>o.maxTextureSize||e.height>o.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);let g=new Uint8ClampedArray(e.height*e.width*4);for(let _=0;_<g.length;_+=4)g[_+0]=e.data[_+0],g[_+1]=e.data[_+1],g[_+2]=e.data[_+2],g[_+3]=e.data[_+3];p.putImageData(new ImageData(g,e.width,e.height),0,0)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas)p.drawImage(e,0,0,f.width,f.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");o.binary===!0?c.push(Rf(f,i).then(g=>s.processBufferViewImage(g)).then(g=>{d.bufferView=g})):d.uri=Zn.getDataURL(f,i);let m=a.images.push(d)-1;return h[u]=m,m}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(e){let t=this.json;t.samplers||(t.samplers=[]);let n={magFilter:ot[e.magFilter],minFilter:ot[e.minFilter],wrapS:ot[e.wrapS],wrapT:ot[e.wrapT]};return t.samplers.push(n)-1}async processTextureAsync(e){let n=this.options,i=this.cache,s=this.json;if(i.textures.has(e))return i.textures.get(e);s.textures||(s.textures=[]),e instanceof cn&&(e=await this.decompressTextureAsync(e,n.maxTextureSize));let r=e.userData.mimeType,a=this.processImage(e.image,e.format,e.flipY,r),o={sampler:this.processSampler(e)};r==="image/webp"?(o.extensions=o.extensions||{},o.extensions.EXT_texture_webp={source:a},this.extensionsUsed.EXT_texture_webp=!0,this.extensionsRequired.EXT_texture_webp=!0):o.source=a,e.name&&(o.name=e.name),await this._invokeAllAsync(async function(h){h.writeTexture&&await h.writeTexture(e,o)});let c=s.textures.push(o)-1;return i.textures.set(e,c),c}async processMaterialAsync(e,t){let n=this.cache,i=this.json,s=t!==void 0&&t.hasAttribute("tangent"),r=e.normalMap?e.uuid+":"+s:e.uuid;if(n.materials.has(r))return n.materials.get(r);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;i.materials||(i.materials=[]);let a={pbrMetallicRoughness:{}};e.isMeshStandardMaterial!==!0&&e.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");let o=e.color.toArray().concat([e.opacity]);if(jt(o,[1,1,1,1])||(a.pbrMetallicRoughness.baseColorFactor=o),e.isMeshStandardMaterial?(a.pbrMetallicRoughness.metallicFactor=e.metalness,a.pbrMetallicRoughness.roughnessFactor=e.roughness):(a.pbrMetallicRoughness.metallicFactor=0,a.pbrMetallicRoughness.roughnessFactor=1),e.metalnessMap||e.roughnessMap){let h=await this.buildMetalRoughTextureAsync(e.metalnessMap,e.roughnessMap),u={index:await this.processTextureAsync(h),texCoord:h.channel};this.applyTextureTransform(u,h),a.pbrMetallicRoughness.metallicRoughnessTexture=u}if(e.map){let h={index:await this.processTextureAsync(e.map),texCoord:e.map.channel};this.applyTextureTransform(h,e.map),a.pbrMetallicRoughness.baseColorTexture=h}if(e.emissive){let h=e.emissive;if(Math.max(h.r,h.g,h.b)>0&&(a.emissiveFactor=e.emissive.toArray()),e.emissiveMap){let d={index:await this.processTextureAsync(e.emissiveMap),texCoord:e.emissiveMap.channel};this.applyTextureTransform(d,e.emissiveMap),a.emissiveTexture=d}}if(e.normalMap){let h=e.normalScale,u=h.x<0,d=s?h.y<0:h.y>0,f=e.normalMap;if(u||d){n.normalMaps.has(e.normalMap)===!1&&n.normalMaps.set(e.normalMap,{});let m=n.normalMaps.get(e.normalMap),g=`${u}:${d}`;m[g]===void 0&&(m[g]=await this.buildNormalMapTextureAsync(e.normalMap,u,d)),f=m[g]}let p={index:await this.processTextureAsync(f),texCoord:e.normalMap.channel};Math.abs(h.x)!==1&&(p.scale=Math.abs(h.x)),this.applyTextureTransform(p,e.normalMap),a.normalTexture=p}if(e.aoMap){let h={index:await this.processTextureAsync(e.aoMap),texCoord:e.aoMap.channel};e.aoMapIntensity!==1&&(h.strength=e.aoMapIntensity),this.applyTextureTransform(h,e.aoMap),a.occlusionTexture=h}e.transparent?a.alphaMode="BLEND":e.alphaTest>0&&(a.alphaMode="MASK",a.alphaCutoff=e.alphaTest),e.side===Pt&&(a.doubleSided=!0),e.name!==""&&(a.name=e.name),this.serializeUserData(e,a),await this._invokeAllAsync(async function(h){h.writeMaterialAsync&&await h.writeMaterialAsync(e,a)});let c=i.materials.push(a)-1;return n.materials.set(r,c),c}async processMeshAsync(e){let t=this.cache,n=this.json,i=[e.geometry.uuid];if(Array.isArray(e.material))for(let S=0,w=e.material.length;S<w;S++)i.push(e.material[S].uuid);else i.push(e.material.uuid);let s=i.join(":");if(t.meshes.has(s))return t.meshes.get(s);let r=e.geometry,a;e.isLineSegments?a=de.LINES:e.isLineLoop?a=de.LINE_LOOP:e.isLine?a=de.LINE_STRIP:e.isPoints?a=de.POINTS:a=e.material.wireframe?de.LINES:de.TRIANGLES;let o={},c={},h=[],u=[],d={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},f=r.getAttribute("normal");f!==void 0&&!this.isNormalizedNormalAttribute(f)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),r.setAttribute("normal",this.createNormalizedNormalAttribute(f)));let p=null;for(let S in r.attributes){if(S.slice(0,5)==="morph")continue;let w=r.attributes[S];if(S=d[S]||S.toUpperCase(),!/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(S)&&!S.startsWith("_")&&(S="_"+S),t.attributes.has(this.getUID(w))){c[S]=t.attributes.get(this.getUID(w));continue}p=null;let E=w.array;S==="JOINTS_0"&&!(E instanceof Uint16Array)&&!(E instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),p=fn.Utils.toTypedBufferAttribute(w,Uint16Array)):(E instanceof Uint32Array||E instanceof Int32Array)&&!S.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${S}" converted to type FLOAT.`),p=fn.Utils.toTypedBufferAttribute(w,Float32Array));let I=this.processAccessor(p||w,r);I!==null&&(S.startsWith("_")||this.detectMeshQuantization(S,w),c[S]=I,t.attributes.set(this.getUID(w),I))}if(f!==void 0&&r.setAttribute("normal",f),Object.keys(c).length===0)return null;if(e.morphTargetInfluences!==void 0&&e.morphTargetInfluences.length>0){let S=[],w=[],T={};if(e.morphTargetDictionary!==void 0)for(let E in e.morphTargetDictionary)T[e.morphTargetDictionary[E]]=E;for(let E=0;E<e.morphTargetInfluences.length;++E){let I={},L=!1;for(let M in r.morphAttributes){if(M!=="position"&&M!=="normal"){L||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),L=!0);continue}let C=r.morphAttributes[M][E],y=M.toUpperCase(),F=r.attributes[M];if(t.attributes.has(this.getUID(C,!0))){I[y]=t.attributes.get(this.getUID(C,!0));continue}let j=C.clone();if(!r.morphTargetsRelative)for(let O=0,G=C.count;O<G;O++)for(let k=0;k<C.itemSize;k++)k===0&&j.setX(O,C.getX(O)-F.getX(O)),k===1&&j.setY(O,C.getY(O)-F.getY(O)),k===2&&j.setZ(O,C.getZ(O)-F.getZ(O)),k===3&&j.setW(O,C.getW(O)-F.getW(O));I[y]=this.processAccessor(j,r),t.attributes.set(this.getUID(F,!0),I[y])}u.push(I),S.push(e.morphTargetInfluences[E]),e.morphTargetDictionary!==void 0&&w.push(T[E])}o.weights=S,w.length>0&&(o.extras={},o.extras.targetNames=w)}let m=Array.isArray(e.material);if(m&&r.groups.length===0)return null;let g=!1;if(m&&r.index===null){let S=[];for(let w=0,T=r.attributes.position.count;w<T;w++)S[w]=w;r.setIndex(S),g=!0}let _=m?e.material:[e.material],v=m?r.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let S=0,w=v.length;S<w;S++){let T={mode:a,attributes:c};if(this.serializeUserData(r,T),u.length>0&&(T.targets=u),r.index!==null){let I=this.getUID(r.index);(v[S].start!==void 0||v[S].count!==void 0)&&(I+=":"+v[S].start+":"+v[S].count),t.attributes.has(I)?T.indices=t.attributes.get(I):(T.indices=this.processAccessor(r.index,r,v[S].start,v[S].count),t.attributes.set(I,T.indices)),T.indices===null&&delete T.indices}let E=await this.processMaterialAsync(_[v[S].materialIndex],r);E!==null&&(T.material=E),h.push(T)}g===!0&&r.setIndex(null),o.primitives=h,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(S){S.writeMesh&&S.writeMesh(e,o)});let b=n.meshes.push(o)-1;return t.meshes.set(s,b),b}detectMeshQuantization(e,t){if(this.extensionsUsed[Fa])return;let n;switch(t.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}t.normalized&&(n+=" normalized");let i=e.split("_",1)[0];Uc[i]&&Uc[i].includes(n)&&(this.extensionsUsed[Fa]=!0,this.extensionsRequired[Fa]=!0)}processCamera(e){let t=this.json;t.cameras||(t.cameras=[]);let n=e.isOrthographicCamera,i={type:n?"orthographic":"perspective"};return n?i.orthographic={xmag:e.right,ymag:e.top,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:i.perspective={aspectRatio:e.aspect,yfov:Ue.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},e.name!==""&&(i.name=e.type),t.cameras.push(i)-1}processAnimation(e,t){let n=this.json,i=this.nodeMap;n.animations||(n.animations=[]),e=fn.Utils.mergeMorphTargetTracks(e.clone(),t);let s=e.tracks,r=[],a=[];for(let c=0;c<s.length;++c){let h=s[c],u=_e.parseTrackName(h.name),d=_e.findNode(t,u.nodeName),f=Oc[u.propertyName];if(u.objectName==="bones"&&(d.isSkinnedMesh===!0?d=d.skeleton.getBoneByName(u.objectIndex):d=void 0),!d||!f){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',h.name);continue}let p=1,m=h.values.length/h.times.length;f===Oc.morphTargetInfluences&&(m/=d.morphTargetInfluences.length);let g;h.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(g="CUBICSPLINE",m/=3):h.getInterpolation()===xt?g="STEP":g="LINEAR",a.push({input:this.processAccessor(new xe(h.times,p)),output:this.processAccessor(new xe(h.values,m)),interpolation:g}),r.push({sampler:a.length-1,target:{node:i.get(d),path:f}})}let o={name:e.name||"clip_"+n.animations.length,samplers:a,channels:r};return this.serializeUserData(e,o),n.animations.push(o),n.animations.length-1}processSkin(e){let t=this.json,n=this.nodeMap,i=t.nodes[n.get(e)],s=e.skeleton;if(s===void 0)return null;let r=e.skeleton.bones[0];if(r===void 0)return null;let a=[],o=new Float32Array(s.bones.length*16),c=new se;for(let u=0;u<s.bones.length;++u)a.push(n.get(s.bones[u])),c.copy(s.boneInverses[u]),c.multiply(e.bindMatrix).toArray(o,u*16);return t.skins===void 0&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new xe(o,16)),joints:a,skeleton:n.get(r)}),i.skin=t.skins.length-1}async processNodeAsync(e){let t=this.json,n=this.options,i=this.nodeMap;if(t.nodes||(t.nodes=[]),e.pivot!==null)return await this._processNodeWithPivotAsync(e);let s={};if(n.trs){let a=e.quaternion.toArray(),o=e.position.toArray(),c=e.scale.toArray();jt(a,[0,0,0,1])||(s.rotation=a),jt(o,[0,0,0])||(s.translation=o),jt(c,[1,1,1])||(s.scale=c)}else e.matrixAutoUpdate&&e.updateMatrix(),Af(e.matrix)===!1&&(s.matrix=e.matrix.elements);if(e.name!==""&&(s.name=String(e.name)),this.serializeUserData(e,s),e.isMesh||e.isLine||e.isPoints){let a=await this.processMeshAsync(e);a!==null&&(s.mesh=a)}else e.isCamera&&(s.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);let r=t.nodes.push(s)-1;if(i.set(e,r),e.children.length>0){let a=[];for(let o=0,c=e.children.length;o<c;o++){let h=e.children[o];if(h.visible||n.onlyVisible===!1){let u=await this.processNodeAsync(h);u!==null&&a.push(u)}}a.length>0&&(s.children=a)}return await this._invokeAllAsync(function(a){a.writeNode&&a.writeNode(e,s)}),r}async _processNodeWithPivotAsync(e){let t=this.json,n=this.options,i=this.nodeMap,s=e.pivot,r={},a=e.quaternion.toArray(),o=[e.position.x+s.x,e.position.y+s.y,e.position.z+s.z],c=e.scale.toArray();jt(a,[0,0,0,1])||(r.rotation=a),jt(o,[0,0,0])||(r.translation=o),jt(c,[1,1,1])||(r.scale=c),r.extras={pivot:s.toArray()},e.name!==""&&(r.name=String(e.name)),this.serializeUserData(e,r);let h=t.nodes.push(r)-1;i.set(e,h);let u={},d=[-s.x,-s.y,-s.z];if(jt(d,[0,0,0])||(u.translation=d),e.isMesh||e.isLine||e.isPoints){let m=await this.processMeshAsync(e);m!==null&&(u.mesh=m)}else e.isCamera&&(u.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);let p=[t.nodes.push(u)-1];if(e.children.length>0){let m=[];for(let g=0,_=e.children.length;g<_;g++){let v=e.children[g];if(v.visible||n.onlyVisible===!1){let b=await this.processNodeAsync(v);b!==null&&m.push(b)}}m.length>0&&(u.children=m)}return r.children=p,await this._invokeAllAsync(function(m){m.writeNode&&m.writeNode(e,r)}),h}async processSceneAsync(e){let t=this.json,n=this.options;t.scenes||(t.scenes=[],t.scene=0);let i={};e.name!==""&&(i.name=e.name),t.scenes.push(i);let s=[];for(let r=0,a=e.children.length;r<a;r++){let o=e.children[r];if(o.visible||n.onlyVisible===!1){let c=await this.processNodeAsync(o);c!==null&&s.push(c)}}s.length>0&&(i.nodes=s),this.serializeUserData(e,i)}async processObjectsAsync(e){let t=new Et;t.name="AuxScene";for(let n=0;n<e.length;n++)t.children.push(e[n]);await this.processSceneAsync(t)}async processInputAsync(e){let t=this.options;e=e instanceof Array?e:[e],await this._invokeAllAsync(function(i){i.beforeParse&&i.beforeParse(e)});let n=[];for(let i=0;i<e.length;i++)e[i]instanceof Et?await this.processSceneAsync(e[i]):n.push(e[i]);n.length>0&&await this.processObjectsAsync(n);for(let i=0;i<this.skins.length;++i)this.processSkin(this.skins[i]);if(e.length===1)for(let i=0;i<t.animations.length;++i)this.processAnimation(t.animations[i],e[0]);else for(let i=0;i<e.length;i++){let s=t.animations[i]||[];for(let r=0;r<s.length;++r)this.processAnimation(s[r],e[i])}await this._invokeAllAsync(function(i){i.afterParse&&i.afterParse(e)})}async _invokeAllAsync(e){for(let t=0,n=this.plugins.length;t<n;t++)await e(this.plugins[t])}},Ga=class{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);return}let n=this.writer,i=n.json,s=n.extensionsUsed,r={};e.name&&(r.name=e.name),r.color=e.color.toArray(),r.intensity=e.intensity,e.isDirectionalLight?r.type="directional":e.isPointLight?(r.type="point",e.distance>0&&(r.range=e.distance)):e.isSpotLight&&(r.type="spot",e.distance>0&&(r.range=e.distance),r.spot={},r.spot.innerConeAngle=(1-e.penumbra)*e.angle,r.spot.outerConeAngle=e.angle),e.decay!==void 0&&e.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),e.target&&(e.target.parent!==e||e.target.position.x!==0||e.target.position.y!==0||e.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),s[this.name]||(i.extensions=i.extensions||{},i.extensions[this.name]={lights:[]},s[this.name]=!0);let a=i.extensions[this.name].lights;a.push(r),t.extensions=t.extensions||{},t.extensions[this.name]={light:a.length-1}}},Ha=class{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}async writeMaterialAsync(e,t){if(!e.isMeshBasicMaterial)return;let i=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},i[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}},Va=class{constructor(e){this.writer=e,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.clearcoat===0)return;let n=this.writer,i=n.extensionsUsed,s={};if(s.clearcoatFactor=e.clearcoat,e.clearcoatMap){let r={index:await n.processTextureAsync(e.clearcoatMap),texCoord:e.clearcoatMap.channel};n.applyTextureTransform(r,e.clearcoatMap),s.clearcoatTexture=r}if(s.clearcoatRoughnessFactor=e.clearcoatRoughness,e.clearcoatRoughnessMap){let r={index:await n.processTextureAsync(e.clearcoatRoughnessMap),texCoord:e.clearcoatRoughnessMap.channel};n.applyTextureTransform(r,e.clearcoatRoughnessMap),s.clearcoatRoughnessTexture=r}if(e.clearcoatNormalMap){let r={index:await n.processTextureAsync(e.clearcoatNormalMap),texCoord:e.clearcoatNormalMap.channel};e.clearcoatNormalScale.x!==1&&(r.scale=e.clearcoatNormalScale.x),n.applyTextureTransform(r,e.clearcoatNormalMap),s.clearcoatNormalTexture=r}t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}},Wa=class{constructor(e){this.writer=e,this.name="KHR_materials_dispersion"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.dispersion===0)return;let i=this.writer.extensionsUsed,s={};s.dispersion=e.dispersion,t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}},Xa=class{constructor(e){this.writer=e,this.name="KHR_materials_iridescence"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.iridescence===0)return;let n=this.writer,i=n.extensionsUsed,s={};if(s.iridescenceFactor=e.iridescence,e.iridescenceMap){let r={index:await n.processTextureAsync(e.iridescenceMap),texCoord:e.iridescenceMap.channel};n.applyTextureTransform(r,e.iridescenceMap),s.iridescenceTexture=r}if(s.iridescenceIor=e.iridescenceIOR,s.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,s.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,e.iridescenceThicknessMap){let r={index:await n.processTextureAsync(e.iridescenceThicknessMap),texCoord:e.iridescenceThicknessMap.channel};n.applyTextureTransform(r,e.iridescenceThicknessMap),s.iridescenceThicknessTexture=r}t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}},qa=class{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,i=n.extensionsUsed,s={};if(s.transmissionFactor=e.transmission,e.transmissionMap){let r={index:await n.processTextureAsync(e.transmissionMap),texCoord:e.transmissionMap.channel};n.applyTextureTransform(r,e.transmissionMap),s.transmissionTexture=r}t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}},Ya=class{constructor(e){this.writer=e,this.name="KHR_materials_volume"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,i=n.extensionsUsed,s={};if(s.thicknessFactor=e.thickness,e.thicknessMap){let r={index:await n.processTextureAsync(e.thicknessMap),texCoord:e.thicknessMap.channel};n.applyTextureTransform(r,e.thicknessMap),s.thicknessTexture=r}e.attenuationDistance!==1/0&&(s.attenuationDistance=e.attenuationDistance),s.attenuationColor=e.attenuationColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}},Za=class{constructor(e){this.writer=e,this.name="KHR_materials_ior"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.ior===1.5)return;let i=this.writer.extensionsUsed,s={};s.ior=e.ior,t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}},Ka=class{constructor(e){this.writer=e,this.name="KHR_materials_specular"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.specularIntensity===1&&e.specularColor.equals(vf)&&!e.specularIntensityMap&&!e.specularColorMap)return;let n=this.writer,i=n.extensionsUsed,s={};if(e.specularIntensityMap){let r={index:await n.processTextureAsync(e.specularIntensityMap),texCoord:e.specularIntensityMap.channel};n.applyTextureTransform(r,e.specularIntensityMap),s.specularTexture=r}if(e.specularColorMap){let r={index:await n.processTextureAsync(e.specularColorMap),texCoord:e.specularColorMap.channel};n.applyTextureTransform(r,e.specularColorMap),s.specularColorTexture=r}s.specularFactor=e.specularIntensity,s.specularColorFactor=e.specularColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}},ja=class{constructor(e){this.writer=e,this.name="KHR_materials_sheen"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.sheen==0)return;let n=this.writer,i=n.extensionsUsed,s={};if(e.sheenRoughnessMap){let r={index:await n.processTextureAsync(e.sheenRoughnessMap),texCoord:e.sheenRoughnessMap.channel};n.applyTextureTransform(r,e.sheenRoughnessMap),s.sheenRoughnessTexture=r}if(e.sheenColorMap){let r={index:await n.processTextureAsync(e.sheenColorMap),texCoord:e.sheenColorMap.channel};n.applyTextureTransform(r,e.sheenColorMap),s.sheenColorTexture=r}s.sheenRoughnessFactor=e.sheenRoughness,s.sheenColorFactor=e.sheenColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}},Ja=class{constructor(e){this.writer=e,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.anisotropy==0)return;let n=this.writer,i=n.extensionsUsed,s={};if(e.anisotropyMap){let r={index:await n.processTextureAsync(e.anisotropyMap)};n.applyTextureTransform(r,e.anisotropyMap),s.anisotropyTexture=r}s.anisotropyStrength=e.anisotropy,s.anisotropyRotation=e.anisotropyRotation,t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}},$a=class{constructor(e){this.writer=e,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.emissiveIntensity===1)return;let i=this.writer.extensionsUsed,s={};s.emissiveStrength=e.emissiveIntensity,t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}},Qa=class{constructor(e){this.writer=e,this.name="EXT_materials_bump"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.bumpScale===1&&!e.bumpMap)return;let n=this.writer,i=n.extensionsUsed,s={};if(e.bumpMap){let r={index:await n.processTextureAsync(e.bumpMap),texCoord:e.bumpMap.channel};n.applyTextureTransform(r,e.bumpMap),s.bumpTexture=r}s.bumpFactor=e.bumpScale,t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}},eo=class{constructor(e){this.writer=e,this.name="EXT_mesh_gpu_instancing"}writeNode(e,t){if(!e.isInstancedMesh)return;let n=this.writer,i=e,s=new Float32Array(i.count*3),r=new Float32Array(i.count*4),a=new Float32Array(i.count*3),o=new se,c=new U,h=new Ee,u=new U;for(let f=0;f<i.count;f++)i.getMatrixAt(f,o),o.decompose(c,h,u),c.toArray(s,f*3),h.toArray(r,f*4),u.toArray(a,f*3);let d={TRANSLATION:n.processAccessor(new xe(s,3)),ROTATION:n.processAccessor(new xe(r,4)),SCALE:n.processAccessor(new xe(a,3))};i.instanceColor&&(d._COLOR_0=n.processAccessor(i.instanceColor)),t.extensions=t.extensions||{},t.extensions[this.name]={attributes:d},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}};fn.Utils={insertKeyframe:function(l,e){let n=l.getValueSize(),i=new l.TimeBufferType(l.times.length+1),s=new l.ValueBufferType(l.values.length+n),r=l.createInterpolant(new l.ValueBufferType(n)),a;if(l.times.length===0){i[0]=e;for(let o=0;o<n;o++)s[o]=0;a=0}else if(e<l.times[0]){if(Math.abs(l.times[0]-e)<.001)return 0;i[0]=e,i.set(l.times,1),s.set(r.evaluate(e),0),s.set(l.values,n),a=0}else if(e>l.times[l.times.length-1]){if(Math.abs(l.times[l.times.length-1]-e)<.001)return l.times.length-1;i[i.length-1]=e,i.set(l.times,0),s.set(l.values,0),s.set(r.evaluate(e),l.values.length),a=i.length-1}else for(let o=0;o<l.times.length;o++){if(Math.abs(l.times[o]-e)<.001)return o;if(l.times[o]<e&&l.times[o+1]>e){i.set(l.times.slice(0,o+1),0),i[o+1]=e,i.set(l.times.slice(o+1),o+2),s.set(l.values.slice(0,(o+1)*n),0),s.set(r.evaluate(e),(o+1)*n),s.set(l.values.slice((o+1)*n),(o+2)*n),a=o+1;break}}return l.times=i,l.values=s,a},mergeMorphTargetTracks:function(l,e){let t=[],n={},i=l.tracks;for(let s=0;s<i.length;++s){let r=i[s],a=_e.parseTrackName(r.name),o=_e.findNode(e,a.nodeName);if(a.propertyName!=="morphTargetInfluences"||a.propertyIndex===void 0){t.push(r);continue}if(r.createInterpolant!==r.InterpolantFactoryMethodDiscrete&&r.createInterpolant!==r.InterpolantFactoryMethodLinear){if(r.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),r=r.clone(),r.setInterpolation(Vt)}let c=o.morphTargetInfluences.length,h=o.morphTargetDictionary[a.propertyIndex];if(h===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+a.propertyIndex);let u;if(n[o.uuid]===void 0){u=r.clone();let f=new u.ValueBufferType(c*u.times.length);for(let p=0;p<u.times.length;p++)f[p*c+h]=u.values[p];u.name=(a.nodeName||"")+".morphTargetInfluences",u.values=f,n[o.uuid]=u,t.push(u);continue}let d=r.createInterpolant(new r.ValueBufferType(1));u=n[o.uuid];for(let f=0;f<u.times.length;f++)u.values[f*c+h]=d.evaluate(u.times[f]);for(let f=0;f<r.times.length;f++){let p=this.insertKeyframe(u,r.times[f]);u.values[p*c+h]=r.values[f]}}return l.tracks=t,l},toTypedBufferAttribute:function(l,e){let t=new xe(new e(l.count*l.itemSize),l.itemSize,!1);if(!l.normalized&&!l.isInterleavedBufferAttribute)return t.array.set(l.array),t;for(let n=0,i=l.count;n<i;n++)for(let s=0;s<l.itemSize;s++)t.setComponent(n,s,l.getComponent(n,s));return t}};var Yc=rl(Gc()),Lx=[".dae",".glb",".gltf",".stl",".obj",".kmz",".zip"],Cf="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";function Ks(){let l=new Qn;return l.setURLModifier(e=>/\.(png|jpe?g|bmp|tga|gif|tif+)$/i.test(e)?Cf:e),l}async function If(l){let e=await Yc.default.loadAsync(l),t=Object.values(e.files).find(n=>!n.dir&&/\.dae$/i.test(n.name));if(!t)throw new Error("El archivo comprimido no tiene ning\xFAn .dae adentro.");return await t.async("string")}async function Dx(l){let e=l.name.toLowerCase(),t=e.slice(e.lastIndexOf("."));if(t===".skp")throw new Error("El archivo .skp no se puede leer directo. En SketchUp and\xE1 a Archivo \u203A Exportar \u203A Modelo 3D y eleg\xED COLLADA (.dae).");let n=await l.arrayBuffer(),i,s=!1;if(t===".glb"||t===".gltf")i=(await new ks(Ks()).parseAsync(n,"")).scene;else if(t===".dae")i=new Vi(Ks()).parse(new TextDecoder().decode(n),"").scene;else if(t===".kmz"||t===".zip")i=new Vi(Ks()).parse(await If(n),"").scene;else if(t===".stl"){let a=new Xs().parse(n);i=new Be(a,new ut),s=!0}else if(t===".obj")i=new Zs(Ks()).parse(new TextDecoder().decode(n));else throw new Error("Formato no admitido. Us\xE1 .dae (recomendado), .glb, .stl u .obj");let r=new He;return s&&(i.rotation.x=-Math.PI/2),r.add(i),r.updateMatrixWorld(!0),r}function no(l){let e=l>>>0;return()=>(e=e*1664525+1013904223>>>0)/4294967296}function Pf(l=1024){let e=document.createElement("canvas");e.width=e.height=l;let t=e.getContext("2d");t.fillStyle="#e3c79c",t.fillRect(0,0,l,l);let n=no(7);for(let i=0;i<9;i++){let s=n()*l,r=30+n()*120;t.fillStyle=`rgba(${n()<.5?"160,110,60":"255,240,215"},${.05+n()*.08})`;for(let a of[-l,0,l])t.fillRect(0,s+a,l,r)}for(let i=0;i<520;i++){let s=n()*l,r=.03+n()*.1,a=.6+n()*1.6,o=n()<.7;t.strokeStyle=o?`rgba(120,78,40,${r})`:`rgba(255,245,225,${r})`,t.lineWidth=a;let c=1+n()*4,h=n()*6.28,u=2*Math.PI*(1+Math.floor(n()*3))/l;for(let d of[-l,0,l]){t.beginPath();for(let f=0;f<=l;f+=16){let p=s+d+Math.sin(f*u+h)*c;f===0?t.moveTo(f,p):t.lineTo(f,p)}t.stroke()}}return Zc(t,l,10,3),e}function Hc(l,e,t=512,n=3){let i=document.createElement("canvas");i.width=i.height=t;let s=i.getContext("2d");s.fillStyle=l,s.fillRect(0,0,t,t);let r=no(n);for(let a=0;a<e.n;a++){let o=r()*t,c=r()*t,h=.5+r()*e.s;s.fillStyle=r()<.5?e.a:e.b,s.globalAlpha=.15+r()*.35,s.fillRect(o,c,h,h*(.4+r()))}return s.globalAlpha=1,Zc(s,t,e.ruido,n),i}function Zc(l,e,t,n){let i=l.getImageData(0,0,e,e),s=no(n+99);for(let r=0;r<i.data.length;r+=4){let a=(s()-.5)*t;i.data[r]+=a,i.data[r+1]+=a,i.data[r+2]+=a}l.putImageData(i,0,0)}var Vc={madera:{nombre:"Madera balsa",textura:()=>Pf(),escala:.16,color:16777215,base:13811364,rugosidad:.72},"carton-blanco":{nombre:"Cart\xF3n blanco",textura:()=>Hc("#efebe3",{n:2200,s:1.6,a:"#c9c2b4",b:"#ffffff",ruido:7}),escala:.12,color:16777215,base:14999250,rugosidad:.9},"carton-gris":{nombre:"Cart\xF3n gris",textura:()=>Hc("#a2a2a0",{n:5e3,s:2.2,a:"#6c6c6c",b:"#c8c6c2",ruido:14},512,11),escala:.12,color:16777215,base:12894134,rugosidad:.92}};function Wc(l){if(!l)return!1;let e=(l.name||"").toLowerCase();return/vidr|glass|cristal|ventan|window|transl|translu/.test(e)?!0:l.transparent&&l.opacity<.95||l.opacity<.95||(l.transmission||0)>.3}function Xc(l,e){let t=l.index?l.toNonIndexed():l.clone(),n=new Te;return n.setAttribute("position",t.getAttribute("position").clone()),t.getAttribute("normal")&&n.setAttribute("normal",t.getAttribute("normal").clone()),n.applyMatrix4(e),n.getAttribute("normal")||n.computeVertexNormals(),n}function qc(l,e){let t=l.getAttribute("position"),n=l.getAttribute("normal"),i=new Float32Array(t.count*2);for(let s=0;s<t.count;s+=3){let r=0,a=0,o=0;for(let d=0;d<3&&s+d<t.count;d++)r+=n.getX(s+d),a+=n.getY(s+d),o+=n.getZ(s+d);let c=Math.abs(r),h=Math.abs(a),u=Math.abs(o);for(let d=0;d<3&&s+d<t.count;d++){let f=t.getX(s+d),p=t.getY(s+d),m=t.getZ(s+d),g,_;h>=c&&h>=u?(g=f,_=m):c>=u?(g=m,_=p):(g=f,_=p),i[(s+d)*2]=g/e,i[(s+d)*2+1]=_/e}}return l.setAttribute("uv",new xe(i,2)),l}function Ux(l,e){let t=Vc[e.estilo]||Vc.madera,n=new se().makeRotationX(-Math.PI/2*(e.giro||0));l.updateMatrixWorld(!0);let i=[],s=[];if(l.traverse(T=>{if(!T.isMesh||!T.geometry?.getAttribute("position")||T.isLine||T.isPoints)return;let E=Array.isArray(T.material)?T.material:[T.material],I=new se().multiplyMatrices(n,T.matrixWorld),L=T.geometry;if(E.length>1&&L.groups.length){let M=L.index?L.toNonIndexed():L;for(let C of M.groups){let y=new Te;for(let F of["position","normal"]){let j=M.getAttribute(F);j&&y.setAttribute(F,new xe(j.array.slice(C.start*j.itemSize,(C.start+C.count)*j.itemSize),j.itemSize))}(Wc(E[C.materialIndex])?s:i).push(Xc(y,I))}}else(Wc(E[0])?s:i).push(Xc(L,I))}),!i.length&&!s.length)throw new Error("No se encontr\xF3 ninguna superficie en el archivo.");let r=new qe;for(let T of[...i,...s])T.computeBoundingBox(),r.union(T.boundingBox);let a=r.getSize(new U),c=.5/(Math.max(a.x,a.z)||1),h=r.getCenter(new U),u=new se().makeScale(c,c,c).multiply(new se().makeTranslation(-h.x,-r.min.y,-h.z)),d=e.base!==!1,f=d?.03:0;u.premultiply(new se().makeTranslation(0,f,0));for(let T of[...i,...s])T.applyMatrix4(u);let p=new Mi(t.textura());p.wrapS=p.wrapT=Ge,p.colorSpace=fe,p.anisotropy=8,p.userData.mimeType="image/jpeg";let m=new Et,g=0,_=(T,E,I)=>{if(!T.length)return;T.forEach(C=>qc(C,t.escala));let L=Mc(T,!1);L=wc(L,1e-6),g+=(L.index?L.index.count:L.getAttribute("position").count)/3;let M=new Be(L,E);M.name=I,m.add(M)},v=new ut({name:"maqueta",map:p,color:t.color,roughness:t.rugosidad,metalness:0,side:Pt}),b=["gris","luz","negro"].includes(e.ventanas)?e.ventanas:"gris",S={gris:{color:8029068,roughness:.12,metalness:.25},luz:{color:7033398,emissive:16754250,emissiveIntensity:2.2,roughness:.25,metalness:0},negro:{color:921103,roughness:.4,metalness:0}},w=new ut({name:"vidrio",side:Pt,...S[b]});if(_(i,v,"maqueta"),_(s,w,"ventanas"),d){let E=a.x*c+.12,I=a.z*c+.06*2,L=new wi(E,f,I).toNonIndexed();L.translate(0,f/2,0);let M=new ut({name:"base",map:p,color:t.base,roughness:t.rugosidad,metalness:0});qc(L,t.escala);let C=new Be(L,M);C.name="base",m.add(C),g+=12}return{escena:m,triangulos:Math.round(g)}}async function Ox(l){return await new fn().parseAsync(l,{binary:!0,maxTextureSize:1024})}export{Vc as ESTILOS,Lx as FORMATOS,Ux as aplicarEstilo,Ox as exportarGLB,Dx as leerArchivo};
/*! Bundled license information:

jszip/dist/jszip.min.js:
  (*!
  
  JSZip v3.10.2 - A JavaScript class for generating and reading zip files
  <http://stuartk.com/jszip>
  
  (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
  Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.
  
  JSZip uses the library pako released under the MIT license :
  https://github.com/nodeca/pako/blob/main/LICENSE
  *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
