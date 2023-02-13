import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { HomeComponent } from './home/home.component';
import { InfoCommentComponent } from './info-comment/info-comment.component';
import { InfoPhotoProfileComponent } from './info-photo-profile/info-photo-profile.component';
import { LoginComponent } from './login/login.component';
import { ProfileFriendComponent } from './profile-friend/profile-friend.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchFriendComponent } from './search-friend/search-friend.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'profile/friend/:id', component: ProfileFriendComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'search/friend', component: SearchFriendComponent },
  { path: 'info/photo/profile/:id', component: InfoPhotoProfileComponent },
  { path: 'comment/info/:id', component: InfoCommentComponent },
  { path: '**', component: HomeComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
