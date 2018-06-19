import java.io.*;
import java.sql.*;
import java.util.logging.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet("/logout")
public class Logout extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
     response.setContentType("text/html;charset=UTF-8");
     PrintWriter out = response.getWriter();

     try {
        HttpSession session = request.getSession(false);
        if (session != null) {
          session.invalidate();
          out.print("success");
          // out.println("<html><head><title>New</title></head><body><p>success</p></body></html>");
        } else {
          out.print("fail");
          // out.println("<html><head><title>New</title></head><body><p>success</p></body></html>");
        }
     } finally {
        out.close();
     }
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response)
         throws ServletException, IOException {
    doGet(request, response);
  }
}
