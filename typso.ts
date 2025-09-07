// src/app/app.component.ts
import {Component,inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
@Component({
selector:'app-root',
standalone:true,
imports:[CommonModule,FormsModule],
template:`<div class="wrap">
<header>
<input [(ngModel)]="q" placeholder="email" />
<button (click)="search()">Search</button>
</header>
<div class="grid">
<div class="card" *ngFor="let u of users">
<img [src]="u.image" class="pic" />
<div class="chip" [style.background]="color(u.role)">{{u.role}}</div>
<div class="name">{{u.username}}</div>
<div class="row">{{u.email}}</div>
<div class="row">{{u.phone}}</div>
<div class="row">{{u.birthDate}}</div>
</div>
</div>
</div>`,
styles:[`.wrap{font-family:Arial;padding:12px;max-width:900px;margin:0 auto}
header{display:flex;gap:8px;margin-bottom:12px}
input{flex:1;padding:8px;border:1px solid #ccc;border-radius:4px}
button{padding:8px 12px;border-radius:6px;border:none;background:#0b6;cursor:pointer}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.card{background:#f7f7f7;border-radius:12px;padding:12px;position:relative;min-height:120px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
.pic{width:60px;height:60px;border-radius:50%;object-fit:cover}
.chip{position:absolute;top:12px;right:12px;padding:6px 8px;border-radius:12px;color:#000;font-weight:600}
.name{font-weight:700;margin-top:8px}
.row{font-size:13px;color:#333;margin-top:4px}`]
})
export class AppComponent{
http=inject(HttpClient);
users:any[]=[];
q='';
ngOnInit(){this.http.get<any[]>('/assets/users.json').subscribe(d=>this.users=d);}
search(){const s=this.q.trim().toLowerCase();if(!s){this.http.get<any[]>('/assets/users.json').subscribe(d=>this.users=d);return}this.http.get<any[]>('/assets/users.json').subscribe(d=>this.users=d.filter(u=>u.email.toLowerCase().includes(s)));}
color(r:string){return r==='admin'?'#f8c8c8':r==='moderator'?'#fff0b3':'#c8f0d0'}}
