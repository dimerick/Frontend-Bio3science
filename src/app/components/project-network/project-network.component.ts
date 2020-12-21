import { Component, OnInit, ViewChild } from '@angular/core';
import { circle, Icon, LatLng, Layer, marker, Marker, point, Point, Polyline, polyline, DivIcon, DomEvent, latLng, svgOverlay, SVGOverlay, LatLngBounds, icon, divIcon, Map } from 'leaflet';
import { LayerMap } from 'src/app/models/LayerMap';
import { ProjectService } from 'src/app/services/project.service';
import { MapComponent } from '../map/map.component';






@Component({
  selector: 'app-project-network',
  templateUrl: './project-network.component.html',
  styleUrls: ['./project-network.component.css'],
  providers: [ProjectService]
})
export class ProjectNetworkComponent implements OnInit {

  public lat: number;
  public lon: number;
  public finishedGetLocation: boolean;
  public layers: Layer[] = [];
  @ViewChild(MapComponent)
  private mapComponent: MapComponent;

  constructor(
    private projectService: ProjectService
  ) {
    this.lat = 200;
    this.lon = 200;
    this.getLocation();
    // this.getProjects();
    

  }

  ngOnInit(): void {
    // this.layers =
    //   [
    //     circle([6.15, -75.64], { radius: 10000 })
    //   ]

    
  }

  getLocation() {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {

        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;


      });
    } else {
      this.lat = 39.952583;
      this.lon = -75.165222;

    }

    
  }

  markerMoved(e: LatLng) {
    console.log(e);
  }

  mapReady(e: boolean){
    this.getProjectNetwork();
  }

  getProjects() {
    this.projectService.getProjects().subscribe(resp => {
      console.log(resp);
    },
      (err) => {
        console.log(err);
      }
    );
  }

  getProjectNetwork() {
    this.projectService.getProjectNetwork().subscribe(resp => {



      console.log(resp);
      resp.forEach(e => {
        console.log(e);
        e.universities_network.forEach(n => {

          let poly = new Polyline([[n.lat, n.long], [n.lat_assoc, n.long_assoc]], {
            color: '#03a7e5',
            weight: 5,
            opacity: 0.5
          });//.bindPopup(e.name);

          // this.layers.push(poly);
          
          let icon = divIcon()
          
          let point1 = this.mapComponent.map.latLngToLayerPoint([n.lat, n.long]);
          let point2 = this.mapComponent.map.latLngToLayerPoint([n.lat_assoc, n.long_assoc]);
          
          console.log(point1, point2);
          let minx = point1.x;
          let maxx = point2.x;
          if(point2.x < minx){
            minx = point2.x;
            maxx = point1.x;
          }
          let miny = point1.y;
          let maxy = point2.y;
          console.log('minx', minx);
          console.log('miny', miny);
          console.log('maxx', maxx);
          console.log('maxy', maxy);
          if(point2.y < miny){
            miny = point2.y;
            maxy = point1.y;
          }
          let width = Math.abs(point2.x-(point1.x));
          let height = Math.abs(point2.y-(point1.y));
          let xmed = minx + (width/2);
          let ymed = maxy;
          console.log(width, height);
          let svgrect = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox="${minx} ${miny} ${width} ${height}"><path d='M${point1.x},${point1.y} Q${xmed},${ymed} ${point2.x},${point2.y}' fill='none' stroke="red" stroke-width="5"/></svg>`;
       
    let rectIcon = divIcon({
        iconSize:     [0, 0],
        iconAnchor:   [0, 0],
        popupAnchor:  [-3, -76],
        html: svgrect
      }
    );
    let mark = marker([n.lat, n.long]).setIcon(rectIcon).bindPopup("I am data URI SVG icon.");
    this.layers.push(mark);

          let columns_images = `<div class="column">`;
          console.log(e.images.length);
          e.images.slice(0, Math.round(e.images.length / 2)).forEach(img => {
            columns_images += `<img src="${img.url}">`;
            

          });
          columns_images += `</div><div class="column">`;
          e.images.slice(Math.round(e.images.length / 2), e.images.length).forEach(img => {
            columns_images += `<img src="${img.url}">`;

          });
          columns_images += `</div>`;

          console.log(columns_images);


          let slider_images = `<div class="slider" data-arrows="true">
          <ul class="slides">`;
          console.log(e.images.length);
          e.images.slice(0, Math.round(e.images.length / 2)).forEach(img => {
            slider_images += `<li><img alt="Image project ${e.name}"src="${img.url}"></li>`;
            

          });
          slider_images += `</ul>
          </div>`;

          e.columns_images = columns_images;
          e.slider_images = slider_images;

          poly.addEventListener('click', (layer) => {
            console.log(e);



            this.mapComponent.showInfoLayer(`
            <div class="row">
                                  <div class="col-md-12">
                                      <div>
                                      
                                      <i class="fa fa-map-marker fa-2x" aria-hidden="true" title="Project"></i>
                                      
                                          <h5>${e.name}</h5>
                                                                                   
                                          
                                          <p>
                                          ${e.description.replace(/\n/g, "<br />")}
                                          </p>

                                          <div class="grid-image"> 
                                          
                                          ${e.columns_images}
                                          </div>

                                      </div>
                                      <!--end feature-->
                                  </div>                               
            
            `, latLng(e.lat, e.long));
          }, e);

        });

        e.communities_network.forEach(n => {

          let poly = new Polyline([[n.lat, n.long], [n.lat_assoc, n.long_assoc]], {
            color: '#63bb8c',
            weight: 5,
            opacity: 0.5
          });//.bindPopup(e.name);
          this.layers.push(poly);


          poly.addEventListener('click', (layer) => {
            console.log(e);
            this.mapComponent.showInfoLayer(`
            <div class="row">
                                  <div class="col-md-12">
                                      <div class="">
                                      <i class="fa fa-map-marker fa-2x" aria-hidden="true" title="Project"></i>
                                          <h5>${e.name}</h5>
                                          
                                          <p>
                                          ${e.description.replace(/\n/g, "<br />")}
                                          </p>
                                      </div>
                                      <!--end feature-->
                                  </div>                               
            
            `, latLng(e.lat, e.long));
          }, e);

        });

        this.projectService.getNodes().subscribe(resp => {
          console.log(resp);
          resp.universities.forEach(e => {
            console.log(e);

            let myIcon = new DivIcon({
              className: 'div-icon color1',
              iconSize: [e.points, e.points],
              iconAnchor: [e.points / 2, e.points / 2]

            });

            let myIconSelected = new DivIcon({
              className: 'div-icon color3',
              iconSize: [e.points, e.points],
              iconAnchor: [e.points / 2, e.points / 2]

            });

            let mark = marker([e.lat, e.long], {
              icon: myIcon,
            });//.bindPopup(e.name);

            let layerMap: LayerMap = {
              id: e.id,
              name: e.name,
              layer: mark
            }

            console.log(mark);

            this.layers.push(mark);



            mark.addEventListener('click', (layer) => {
              console.log(e);
              this.mapComponent.showInfoLayer(`
              <div class="row">
                                    <div class="col-md-12">
                                        <div class="">
                                        <i class="fa fa-university fa-2x" aria-hidden="true" title="University"></i>
                                            <h5>${e.name}</h5>
                                            
                                        </div>
                                        <!--end feature-->
                                    </div>                               
              
              `, latLng(e.lat, e.long));
            }, e);

          });

          resp.communities.forEach(e => {
            console.log(e);

            let myIcon = new DivIcon({
              className: 'div-icon color2',
              iconSize: [e.points, e.points],
              iconAnchor: [e.points / 2, e.points / 2]

            });

            let mark = marker([e.lat, e.long], {
              icon: myIcon
            });//.bindPopup(`<span hidden>${e.id}</span>${e.name}`);

            this.layers.push(mark);


            mark.addEventListener('click', (layer) => {
              console.log(e);
              this.mapComponent.showInfoLayer(`
              <div class="row">
                                    <div class="col-md-12">
                                        <div class="">
                                        
                                        <i class="fa fa-users fa-2x" aria-hidden="true" title="Community"></i>
                                            <h5>${e.name}</h5>
                                            
                                        </div>
                                        <!--end feature-->
                                    </div>                               
              
              `, latLng(e.lat, e.long));
            }, e);

          });

        },
          (err) => {
            console.log(err);
          });

      });
    },
      (err) => {
        console.log(err);
      });
  }

  

}
