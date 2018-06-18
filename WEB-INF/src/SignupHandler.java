import java.io.*;
import java.sql.*;
import java.util.logging.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
// import corresponding packages
import javax.sql.DataSource;
import javax.naming.*;

@WebServlet("/signup")
public class SignupHandler extends HttpServlet {
  private DataSource pool;

  @Override
  public void init(ServletConfig config) throws ServletException {
    super.init(config);
    try {
         // Create a JNDI Initial context to be able to lookup the DataSource
         InitialContext context = new InitialContext();
         // Lookup the DataSource, which will be backed by a pool
         //   that the application server provides.
         pool = (DataSource)context.lookup("java:comp/env/jdbc/mysql_gamecenter");
         if (pool == null)
            throw new ServletException("Unknown DataSource 'jdbc/mysql_gamecenter'");
    } catch (NamingException ex) {
       Logger.getLogger(SignupHandler.class.getName()).log(Level.SEVERE, null, ex);
    }
  }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
     response.setContentType("text/html;charset=UTF-8");
     PrintWriter out = response.getWriter();
     String username = request.getParameter("username");
     String password = request.getParameter("password");
     Connection conn = null;
     Statement stmt = null;
     try {
        conn = pool.getConnection();
        stmt = conn.createStatement();
        String signupSql = "INSERT INTO accounts (username, password) VALUES (?, PASSWORD(?))";
        PreparedStatement query = conn.prepareStatement(signupSql);
        query.setString(1, username);
        query.setString(2, password);
        query.executeUpdate();  // Send the query to the server

        // TODO: dispatch to index showing profile
        out.println("<html><head><title>Hey</title></head><body><h1>hello</h1><body></html>");
     } catch (SQLException ex) {
        out.println("<h3>Service not available. Please try again later!</h3></body></html>");
        Logger.getLogger(SignupHandler.class.getName()).log(Level.SEVERE, null, ex);
     } finally {
        out.close();
        try {
           if (stmt != null) stmt.close();
           if (conn != null) conn.close();
        } catch (SQLException ex) {
           Logger.getLogger(SignupHandler.class.getName()).log(Level.SEVERE, null, ex);
        }
     }
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response)
         throws ServletException, IOException {
    doGet(request, response);
  }
}
