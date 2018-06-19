package chasechoi;
public class UserBean implements java.io.Serializable {
    private String username;
    private int win;
    private int total;

    public UserBean() {
        username = "";
        win = 0;
        total = 0;
    }

    public void setUsername(String username) {
      this.username = username;
    }
    public String getUsername() {
      return username;
    }

    public void setWin(int win) {
      this.win = win;
    }
    public int getWin() {
      return win;
    }

    public void setTotal(int total) {
      this.total = total;
    }
    public int getTotal() {
      return total;
    }
}
