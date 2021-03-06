<%@page language="java" contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>游戏中心</title>
    <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="css/main.css"></head>
  <body>
    <!-- navigation bar -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <a class="navbar-brand" href="#">Chase</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="index.jsp">主页<span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>
        <%@include file="status.jsp" %>
        </div>
      </nav>
      <!-- carousel for showing new games -->
      <div id="carouselControls" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselControls" data-slide-to="0" class="active"></li>
          <li data-target="#carouselControls" data-slide-to="1"></li>
          <li data-target="#carouselControls" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
          <div class="carousel-item active">
            <a href="game.html">
              <img class="d-block img-fluid game-ad" src="images/castles.png" alt="First slide"></a>
            <div class="carousel-caption center-block">
              <h1>
                <span>城堡决斗</span>
              </h1>
              <p>
                <span>现已推出</span>
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img class="d-block img-fluid game-ad" src="images/monument-valley.jpg" alt="Second slide">
            <div class="carousel-caption center-block">
              <h1>
                <span>纪念碑谷</span>
              </h1>
              <p>
                <span>敬请期待</span>
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img class="d-block img-fluid game-ad" src="images/coc.jpg" alt="Third slide">
            <div class="carousel-caption center-block">
              <h1>
                <span>部落冲突</span>
              </h1>
              <p>
                <span>敬请期待</span>
              </p>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">前一页</span>
        </a>
        <a class="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">下一页</span>
        </a>
      </div>
      <!-- Sign Up and Sign In -->
      <!-- login form -->
      <div id="login-form" class="modal fade">
        <div class="modal-dialog modal-login">
          <div class="modal-content">
            <div class="modal-header">
              <div class="avatar">
                <img src="images/avatar.png" alt="Avatar"></div>
              <h3>用户登录</h3>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
              <form id="login-info">
                <div class="form-group">
                  <input type="text" id="username" class="form-control" name="username" placeholder="用户名" oninvalid="this.setCustomValidity('请输入用户名!')" oninput="setCustomValidity('')" required="required"></div>
                <div class="form-group">
                  <input type="password" id="password" class="form-control" name="password" placeholder="密码" oninvalid="this.setCustomValidity('请输入密码!')" oninput="setCustomValidity('')" required="required"></div>
                <div class="loginWrong text-danger"></div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary btn-lg btn-block login-btn">登录</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div id="sign-up-form" class="modal fade">
        <div class="modal-dialog modal-login">
          <div class="modal-content">
            <div class="modal-header">
              <div class="avatar">
                <img src="images/avatar.png" alt="Avatar"></div>
              <h3>用户注册</h3>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
              <form id="sign-up-info" action="signup" method="post">
                <div class="form-group">
                  <input type="text" id="username-sign-up" class="form-control" name="username" placeholder="用户名" oninvalid="this.setCustomValidity('请输入用户名!')" oninput="setCustomValidity('')" required="required"></div>
                <div class="duplicateError text-danger"></div>
                <div class="form-group passwordField">
                  <input type="password" class="form-control" id="password-sign-up" name="password" placeholder="密码" oninvalid="this.setCustomValidity('请输入密码!')" oninput="setCustomValidity('')" required="required"></div>
                <div class="form-group passwordField">
                  <input type="password" class="form-control" id="passwordValid" name="passwordValid" placeholder="再次输入密码" oninvalid="this.setCustomValidity('请输入密码!')" oninput="setCustomValidity('')" required="required"></div>
                <div class="pwdNotMatch text-danger"></div>
                <div class="form-group">
                  <button type="submit" class="btn btn-success btn-lg btn-block">注册</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /Sign Up and Sign In -->

      <!-- games recommendation -->
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <img class="card-img-top" src="images/zelda.jpeg" alt="The Legend of Zelda">
              <div class="card-body">
                <h4 class="card-title text-center">塞尔达传说</h4>
                <h5 class="text-center">The Legend of Zelda</h5>
                <a href="https://www.zelda.com" class="btn btn-outline-primary btn-block">查看详情</a>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <img class="card-img-top" src="images/old-man-journey.jpg" alt="old man's journey">
              <div class="card-body">
                <h4 class="card-title text-center">回忆之旅</h4>
                <h5 class="text-center">Old Man's Journey</h5>
                <a href="http://www.oldmansjourney.com" class="btn btn-outline-primary btn-block">查看详情</a>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <img class="card-img-top" src="images/cut-the-rope.jpg" alt="cut the rope">
              <div class="card-body">
                <h4 class="card-title text-center">割绳子</h4>
                <h5 class="text-center">Cut the Rope</h5>
                <a href="https://www.cuttherope.net" class="btn btn-outline-primary btn-block">查看详情</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div class="directory">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <h5>游戏分类</h5>
                <ul>
                  <li>冒险</li>
                  <li>动作</li>
                  <li>解谜</li>
                  <li>竞速</li>
                  <li>策略</li>
                </ul>
              </div>
              <div class="col-md-4">
                <h5>合作</h5>
                <ul>
                  <li>Cut the Rope</li>
                  <li>The Legend of Zelda</li>
                  <li>Monument Valley</li>
                </ul>
              </div>
              <div class="col-md-4">
                <h5>关于我</h5>
                <ul>
                  <li>
                    <a href="https://github.com/ChaseChoi">Github</a>
                  </li>
                  <li>
                    <a href="mailto:caiguihao@gmail.com">Gmail</a>
                  </li>
                  <li>
                    <a href="http://www.cnblogs.com/chasechoi/">博客园</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!--Copyright-->
        <div class="footer-copyright text-center">
          © 2018 Copyright:
          <a href="mailto:caiguihao@gmail.com">caiguihao@gmail.com</a>
        </div>
      </footer>
      <script src="js/bootstrap/jquery-3.3.1.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
      <script src="js/bootstrap/bootstrap.min.js"></script>
      <script src="js/homepage.js"></script>
    </body>
  </html>
