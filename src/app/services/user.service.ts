import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) { 
    
  }

  registration(username:string,password:string,email:string): Observable<any> {
    const body = {username:username,password:password,email:email}
    return this.http.post(this.baseurl + '/auth/users/', body);
  }

  getToken(username:string,password:string): Observable<any> {
    const body = {username:username,password:password}
    return this.http.post(this.baseurl + '/auth-token/token/login/', body);
  }

  getProfileToToken(Token:string): Observable<any> {
    return this.http.get(this.baseurl + '/user/get/profile/to/token/',
    {headers: {Authorization: 'Token ' + Token}});
  }

  patchProfileToToken(Token:string, Phone:string,Nickname:string, status:string, adress:string, img:File): Observable<any> {
   // const body = {phone:Phone,nickname:Nickname, status:status, address:adress}
  const body = new FormData();
  if (img != null) {
    body.append('img', img)
  }
  if(Phone != null){
    body.append('phone', Phone)

  }
  if(Nickname != null){
    body.append('nikname', Nickname)
  }
  if(status != null){
    body.append('status', status)
  }
  if(adress != null){
    body.append('addres', adress)
  }
    return this.http.patch(this.baseurl + '/user/patch/profile/to/token/',body,
    {headers: {Authorization: 'Token ' + Token}});
    
  }


  getListAllMyFriend(Token:string): Observable<any> {
    return this.http.get(this.baseurl + '/user/get/list/all/my/friend/',
    {headers: {Authorization: 'Token ' + Token}});
    
  }

  deleteFriend(id:string, token:string): Observable<any> {
    return this.http.delete(this.baseurl + '/user/delete/friend/'+id+'/',
    {headers: {Authorization: 'Token ' + token}});
  }


  getProfileToUser(id:string): Observable<any> {
    return this.http.get(this.baseurl + '/user/get/profile/to/user/'+id+'/');
  }

  getSearchFriends(search:string): Observable<any> {
    return this.http.get(this.baseurl + '/user/get/search/friend/'+search+'/');
  }

  createFriend(freind:string, token:string): Observable<any> {
    const body = {friend:freind}
    return this.http.post(this.baseurl + '/user/create/friend/',body,
    {headers: {Authorization: 'Token ' + token}});
  }


  checkMyFriend(freind:string, token:string): Observable<any> {
    const body = {friend:freind}
    return this.http.post(this.baseurl + '/user/check/my/friend/',body,
    {headers: {Authorization: 'Token ' + token}});
  }


  deleteMyFriend(friend:string, token:string): Observable<any> {
    const body = {friend:friend}
    return this.http.post(this.baseurl + '/user/delete/my/friend/', body,
    {headers: {Authorization: 'Token ' + token}});
  }

  getListProfilePhotosToUser(token:string): Observable<any> {
    return this.http.get(this.baseurl + '/user/get/list/profile/photos/to/user/', 
    {headers: {Authorization: 'Token ' + token}});
  }


  createProfilePhoto(token:string, img: File): Observable<any> {
    const body = new FormData();
    if (img != null) {
        body.append('img', img)
    }
    return this.http.post(this.baseurl + '/user/create/profile/photo/', body,
    {headers: {Authorization: 'Token ' + token}});
  }

  deleteProfilePhoto(token:string, id: string): Observable<any> {
      return this.http.delete(this.baseurl + '/user/delete/profile/photo/'+id+"/",
    {headers: {Authorization: 'Token ' + token}});
  }
  getListProfilePhotosToUserId(token:string, id: string): Observable<any> {
    return this.http.get(this.baseurl + '/user/get/list/profile/to/user/id/'+id+"/",
  {headers: {Authorization: 'Token ' + token}});
} 
getProfilePhotoToId(id: string): Observable<any> {
  return this.http.get(this.baseurl + '/user/get/profile/photo/to/user/'+id+"/");
}

getListCommentToProfilePhoto(id: string): Observable<any> {
  return this.http.get(this.baseurl + '/user/get/list/comment/to/profile/photo/'+id+"/");
}

createCommentProfilePhoto(photo: string, comment: string, token:string): Observable<any> {
  const body = {photo:photo, comment:comment}
  return this.http.post(this.baseurl + '/user/create/comment/profile/photo/',body,
  {headers: {Authorization: 'Token ' + token}});
}

deleteCommentProfilePhoto(id:string,token:string): Observable<any> {
  return this.http.delete(this.baseurl + '/user/delete/comment/profile/photo/'+id+"/",
  {headers: {Authorization: 'Token ' + token}});
}


}
