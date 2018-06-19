<%@page language="java" contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:useBean id="user" scope="session" class="chasechoi.UserBean" />
<c:choose>
    <c:when test="${user.getUsername() eq ''}">
      <form class="form-inline my-2 my-lg-0">
        <button id="login-button" type="button" data-target="#login-form" data-toggle="modal" class="btn btn-primary my-2 my-sm-0 mr-2">登录</button>
      </form>
      <form class="form-inline my-2 my-lg-0">
        <button type="button" data-target="#sign-up-form" data-toggle="modal" class="btn btn-success my-2 my-sm-0 mr-2">注册</button>
      </form>
    </c:when>
    <c:otherwise>
      <form class="form-inline my-2 my-lg-0 nav-item dropdown user-info">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <c:out value = "${user.getUsername()}"/>
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">我的战绩</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" id="logout" href="logout">退出</a>
        </div>
      </form>
    </c:otherwise>
</c:choose>
