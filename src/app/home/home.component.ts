import { Component, OnInit } from "@angular/core";
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router, NavigationStart } from "@angular/router";
import { ApiService } from "../api.service";
import { ToastrService } from "ngx-toastr";
import { EditUserInput } from "../models/edit_user.model";
import { ExportToCsv } from "export-to-csv";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  users: any;
  closeResult = "";
  edituser: any;

  EditUserData: EditUserInput = {
    pk: null,
    user_id: null,
    first_name: null,
    last_name: null,
    gender: null,
    dob: null,
    email: null,
    phone: null,
    website: null,
    address: null,
    status: null,
  };

  constructor(
    private http: HttpClient,
    private ApiService: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.ful_listof_users();
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  closemodel() {
    let content = "Cross click";
    this.modalService.dismissAll(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  ExToCSV() {
    this.ApiService.fetchApiUser().subscribe(
      (data: any) => {
        const options = {
          fieldSeparator: ",",
          quoteStrings: '"',
          decimalSeparator: ".",
          showLabels: true,
          showTitle: true,
          title: "User Details",
          useTextFile: false,
          useBom: true,
          useKeysAsHeaders: true,
        };
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(data);
      },
      (err: HttpErrorResponse) => {
        console.log(err, " DDDDDDDDDDDDDDDDD 2");
        this.toastr.error("Update", "Updated Error... ", {
          progressBar: true,
          timeOut: 3000,
        });
      }
    );
  }

  ful_listof_users() {
    this.ApiService.fetchApiUser().subscribe(
      (data: any) => {
        this.users = data;
        console.log(data, " DDDDDDDDDDDDDDDDD 1");
      },
      (err: HttpErrorResponse) => {
        console.log(err, " DDDDDDDDDDDDDDDDD 2");
        this.toastr.error("Update", "Updated Error... ", {
          progressBar: true,
          timeOut: 3000,
        });
      }
    );
  }

  EditUser(id) {
    this.ApiService.fetchApiUserSingleData(id).subscribe(
      (data: any) => {
        this.edituser = data;

        console.log(data, " ddddddddd ");

        this.EditUserData.pk = data.pk;
        this.EditUserData.user_id = data.user_id;
        this.EditUserData.first_name = data.first_name;
        this.EditUserData.last_name = data.last_name;
        this.EditUserData.gender = data.gender;
        this.EditUserData.dob = data.dob;
        this.EditUserData.email = data.email;
        this.EditUserData.phone = data.phone;
        this.EditUserData.website = data.website;
        this.EditUserData.address = data.address;
        this.EditUserData.status = data.status;
      },
      (err: HttpErrorResponse) => {
        this.toastr.error("Update", "Updated Error... ", {
          progressBar: true,
          timeOut: 3000,
        });
      }
    );
  }

  EditUserDataSubmit() {
    console.log(this.EditUserData.pk, " WWWWWWWWWWW ");

    this.ApiService.UpdateApiUser(
      this.EditUserData.pk,
      this.EditUserData.user_id,
      this.EditUserData.first_name,
      this.EditUserData.last_name,
      this.EditUserData.gender,
      this.EditUserData.dob,
      this.EditUserData.email,
      this.EditUserData.phone,
      this.EditUserData.website,
      this.EditUserData.address,
      this.EditUserData.status
    ).subscribe(
      (data: any) => {
        console.log(data, " edit ok");
        this.closemodel();
        this.ful_listof_users();

        this.toastr.success("Updated Sucessfully...", "User Details", {
          progressBar: true,
          timeOut: 1500,
        });
      },
      (err: HttpErrorResponse) => {
        this.toastr.error("Update", "Updated Error... ", {
          progressBar: true,
          timeOut: 3000,
        });
      }
    );
  }
}
