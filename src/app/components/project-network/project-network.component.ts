import { Component, OnInit, ViewChild } from '@angular/core';
import { circle, Icon, LatLng, Layer, marker, Marker, point, Point, Polyline, polyline, DivIcon, DomEvent, latLng } from 'leaflet';
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
    this.getProjectNetwork();

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

          this.layers.push(poly);

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

          e.columns_images = columns_images;

          poly.addEventListener('click', (layer) => {
            console.log(e);



            this.mapComponent.showInfoLayer(`
            <div class="row">
                                  <div class="col-md-12">
                                      <div class="feature">
                                      
                                      <i class="fa fa-map-marker fa-2x" aria-hidden="true"></i>
                                      
                                          <h5>${e.name}</h5>
                                          <p>
                                          Project
                                          </p>
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
                                      <div class="feature">
                                      <i class="fa fa-map-marker fa-2x" aria-hidden="true"></i>
                                          <h5>${e.name}</h5>
                                          <p>
                                          Project
                                          </p>
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
                                        <div class="feature feature-6">
                                        <i class="fa fa-university fa-2x" aria-hidden="true"></i>
                                            <h5>${e.name}</h5>
                                            <p>
                                            University
                                            </p>
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
                                        <div class="feature feature-6">
                                        
                                        <i class="fa fa-users fa-2x" aria-hidden="true"></i>
                                            <h5>${e.name}</h5>
                                            <p>
                                            Community
                                            </p>
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
