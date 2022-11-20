import { useState, useEffect  } from 'react';
import {Html5Qrcode} from "html5-qrcode";

const Qrcode = (props) => {
    const [getPostShow, setPostShow] = useState(false);
    const [status, setStatus] = useState(null);
    useEffect(() => {
        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length) {
                const html5QrCode = new Html5Qrcode("reader");
                const qrCodeSuccessCallback = (decodedText, decodedResult) => {
                    if(getPostShow === false){
                        console.log(getPostShow);
                        setPostShow(true);
                        getLocation(html5QrCode);
                    }
                };
                const config = { fps: 10, qrbox: { width: 500, height: 500 }, aspectRatio: 1/1 };
                html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
            }
          }).catch(err => {
            // handle err
          });
    });

    const getLocation = (qrcode) => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            props.btnshow();
            props.setDescrip('Your position when Scan :');
            stopScanner(qrcode);
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                props.setLatState(position.coords.latitude);
                props.setLongState(position.coords.longitude);
            }, () => {
                setStatus('Unable to retrieve your location');
            });
        }
    }

    const stopScanner = (qrcode) => {
    
        const html5QrCoder = qrcode;
        html5QrCoder
        .stop()
        .then(ignore => {
            // QR Code scanning is stopped.
        })
        .catch(err => {
            // Stop failed, handle it.
        });

    }

  return (
    <div style={{marginBottom: '3vh'}}>
        <div style={{display: getPostShow !== true ? 'block' : 'none'}}>
            <div id="reader" width="600px" height="600px"></div>
        </div>
    </div>
  );
};

export default Qrcode;