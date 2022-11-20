import EXIF from 'exif-js';

const Exifreader = (props) => {
    function handleChange({ target: { files: [file] } }) {
        if (file && file.name) {
          EXIF.getData(file, function() {
            var exifData = EXIF.pretty(this);
            if (exifData) {
              console.log(exifData);
              const lat = EXIF.getTag(this, "GPSLatitude");
              const long = EXIF.getTag(this, "GPSLongitude");
              const latref = EXIF.getTag(this, "GPSLatitudeRef");
              const longref = EXIF.getTag(this, "GPSLongitudeRef");
              
              props.setDescrip('Your position when taking pict :');
              props.setLatState(geoConvert(lat, latref));
              props.setLongState(geoConvert(long, longref));
            } else {
              alert("No EXIF data '" + file.name + "'.");
            }
          });
        }
    }

    function geoConvert(gps, ref){
        var [Degrees, Minutes, Seconds] =[null, null, null];
        gps.forEach((e, idx)=>{
          Degrees = idx === 0 ? (e.numerator/e.denominator) : Degrees;
          Minutes = idx === 1 ? (e.numerator/e.denominator) : Minutes;
          Seconds = idx === 2 ? (e.numerator/e.denominator) : Seconds;
        });
        // convert to geological Lat long
        // console.log(Degrees, Minutes, Seconds)
        const currData = Degrees + (Minutes/60) + (Seconds/3600);
        var returnData;
        if(ref === "S" || ref === "W"){
            returnData = -Math.abs(currData);
        } else {
            returnData = currData;
        }
        console.log(returnData)
        return returnData;
    }
    
      return (
        <div style={{marginTop: "5vh"}}>
          <input
            type="file"
            id="file"
            accept="image/*" capture="environment"
            style={{display: 'none'}}
            onChange={handleChange}
          />
          <button>
            <label htmlFor="file">Take photo / select file</label>
          </button>
        </div>
      );
}

export default Exifreader;