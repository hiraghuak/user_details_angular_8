import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  readonly rootUrl = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}

  // FETCH API DATA START
  fetchApiSaveToDataBase() {
    return this.http.get(this.rootUrl + "/fetch/", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }
  // FETCH API DATA END

  // FETCH API DATA FROM DB START
  fetchApiUser() {
    return this.http.get(this.rootUrl + "/user_master/", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  fetchApiUserSingleData(id) {
    return this.http.get(this.rootUrl + "/user_master/" + id + "/", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  UpdateApiUser(
    pk,
    user_id,
    first_name,
    last_name,
    gender,
    dob,
    email,
    phone,
    website,
    address,
    status
  ) {
    const body = {
      pk: pk,
      user_id: user_id,
      first_name: first_name,
      last_name: last_name,
      gender: gender,
      dob: dob,
      email: email,
      phone: phone,
      website: website,
      address: address,
      status: status,
    };
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.put(this.rootUrl + "/user_master/" + pk + "/", body, {
      headers: reqHeader,
    });
  }
  // FETCH API DATA FROM DB END

  fetchApiChild() {
    return this.http.get(this.rootUrl + "/child/", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }


  ExportToCSV() {
    return this.http.get(this.rootUrl + "/csv/", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  fetchApiChildSingleData(id) {
    return this.http.delete(this.rootUrl + "/child/" + id + "/", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  UpdateApiChild(id, self_link, edit_link, avatar_link) {
    const body = {
      pk: id,
      self_link: self_link,
      edit_link: edit_link,
      avatar_link: avatar_link,
    };
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.put(this.rootUrl + "/child", body, {
      headers: reqHeader,
    });
  }
}
