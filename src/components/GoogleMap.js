import React, {useState} from 'react';
import { GoogleMap, LoadScript ,Marker, InfoWindow  } from "@react-google-maps/api"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SensorList from './SensorList';
import {Link} from 'react-router-dom';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { BsArrowUpRightSquare } from 'react-icons/bs';

import data from "../static/branches.json"

function MapContainer() {
  const defaultCenter = {lat: 34.19167584003779, lng: 73.23095807365446}
  
  const [ center, setCenter ] = useState({center:defaultCenter, zoom: 8, isZoom:false});
  const [ selected, setSelected ] = useState({ theta : 0, item: {}});

  // const { side_nav: side_nav_check } = useSelector(selectSiteData);
  // let side_nav = side_nav_check ? <SideNav /> : null;
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"
  };
  
  const onSelect = item => {
    setSelected({theta: selected.theta, item : item});
  }
  
  return (
   <div className="page">
      <div className="page__content">
        <div className="main-wrapper">
          {/* {side_nav} */}
    <div style={{ display: 'block' , margin: 5 }}>
        <Row>
          <Col className='col-md-1 mx-0 my-0' style={{width: "20.499999995%"}}>
            <SensorList sensorSelect={onSelect}/>
          </Col>
          <Col>
            <div>
            <LoadScript googleMapsApiKey="AIzaSyDhUG9a3aSzkdUT5cnKlTZAkhPy2790zEY" >
          <GoogleMap mapContainerStyle={mapStyles} zoom={center.zoom} center={center.center}>
          {
            data.map((item, index) => {
              return (
                // console.log(item)
                <Marker icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"} key={item.city} position={item.location} onClick={() => onSelect(item)} />
              )
            })
          }
          {
            center.isZoom &&
            (
              <div>
              {
                data.map((item, index) => {
                  console.log(data)
                  return (
                      item.branches.map((i, idx) => {
                        return(
                          <Marker icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"} key={i.name} position={i.location} onClick={() => onSelect(i)} />)
                      })
                  )
                })
              }
            </div>
            )
          }
          {

            selected.item.location &&
            (

              <InfoWindow
              position={selected.item.location}
              clickable={true}
              onCloseClick={() => setSelected({paths: selected.paths, theta: selected.theta, item : {}})}
            >
              <div style={{ display: "flex",  justifyContent: "space-between" }}>
              <p className='mx-2' style={{fontSize:"15px" }}>{selected.item.name}</p>
                <span>
                  {center.isZoom ? <a className="px-1" type="button"  onClick={() => setCenter({center:defaultCenter, zoom:8, isZoom:false})}><AiOutlineZoomOut tyle={{verticalAlign: 'baseline'}} color='#000000' size={20}/></a>
                  : <a className="px-1" type="button" onClick={() => setCenter({center:selected.item.location, zoom:8, isZoom:true})}><AiOutlineZoomIn tyle={{verticalAlign: 'baseline'}} color='#000000' size={20}/></a>}
                </span>
              </div>
            </InfoWindow>
            )
          }
          </GoogleMap>
          </LoadScript>
            </div>
          </Col>
        </Row>
        </div>
        </div>
      </div>
   </div>
  )
}

export default MapContainer;
