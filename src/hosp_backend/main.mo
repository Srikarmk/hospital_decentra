import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Array "mo:base/Array";


shared(msg) actor class attend() {

  stable var owner = msg.caller;

  type userProf = {
    name: Text;
    attend: Nat;
  };

  let attendence = HashMap.HashMap<Principal, userProf>(5, Principal.equal, Principal.hash);
  

  public shared(msg) func addAttend(_caller: Principal): async () {

       assert(attendence.get(_caller) != null);

      let user: ?userProf = attendence.get(msg.caller);

      switch(user){
        case(?user){

            let mark: userProf ={
              name = user.name;
              attend = user.attend + 1;
            };

            attendence.put(_caller, mark);
          
        };
          case (null){

            assert(false);

          };

    };
  };

  public shared(msg) func addUser(_caller: Principal, name: Text): async Text {

      assert(msg.caller == owner and attendence.get(_caller) == null);

      let newUser: userProf = {
        name = name;
        attend = 0;
      };

      attendence.put(_caller, newUser);

      name;

    };

    public shared(msg) func removeUser(_caller: Principal, name: Text): async Text {

      assert(msg.caller == owner and attendence.get(_caller) != null);

      attendence.delete(_caller);

      name;

    };

    public query func userAttendence(_caller: Principal): async userProf{

      let course: ?userProf = attendence.get(_caller);

      switch(course){
        case(null){
          let crRating: userProf = {
            name = "";
            attend = 0;
          };

         crRating;
        };
        case(?course){
        course;
        };
      };
    };
};