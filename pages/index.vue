<!-- 


<template>
  <div>
   <h1>Hi there how are you </h1>
   <div>
    <v-container grid-list-xs>
     <v-btn @click="showAdd=!showAdd" color="success" absolute icon top right>

      <v-icon>mdi-plus</v-icon>
     </v-btn>  
     <v-flex v-if="showAdd">
      <v-radio-group v-model="frm.gender " column>
         <v-radio
         
         label="Female"
         value="F"
         >

         </v-radio>
         <v-radio 
         
         label="Male"
          value="M">
          
         </v-radio>
      </v-radio-group>
      <v-text-field
        v-model="frm.firstname"
        name='name'
        label='firstname'
      >
      
      </v-text-field>
      <v-text-field
       v-model="frm.lastname"
       name='name'
        label='lastname'>
      </v-text-field>
      <v-btn @click="saveAction" color="success">Save</v-btn>
      <v-btn @click="showAdd=!showAdd" color="error">Cancel</v-btn>
     </v-flex>
    <v-layout>

      </v-layout>
      <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{student.firstname}}</td>
          <td>{{student.lastname}}</td>
          <td>{{student.gender}}</td>
          <td>
            <v-btn color="success" icon><v-icon>mdi-pencil</v-icon></v-btn>
          </td>
        </tr>
      </tbody>
    </table> 
    </v-container>
   </div>
   <v-dialog
    v-model="showEdit"
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
   >
    <v-card>
      <v-radio-group v-model="edt.gender " column>
         <v-radio
         
         label="Female"
         value="F"
         >

         </v-radio>
         <v-radio 
         
         label="Male"
          value="M">
          
         </v-radio>
      </v-radio-group>
      <v-text-field
        v-model="edt.firstname"
        name='name'
        label='firstname'
      >
      
      </v-text-field>
      <v-text-field
       v-model="edt.lastname"
       name='name'
        label='lastname'>
      </v-text-field>
      <v-btn @click="updateAction" color="success">Save</v-btn>
      <v-btn @click="showEdit=!showEdit" color="error">Cancel</v-btn>
    </v-card>
   </v-dialog>
  </div>
</template>

<script>
import mutationStudent from '~/gql/mutations/students'
  export default {
    layout:'blank',
    data(){
      return{
        students:[],
        frm:{
          firstname:'',
          lastname:'',
          gender:''
        },
        showAdd:false,
        showEdit:false,
      };
    },
    mounted() {
       this.getData()
    },
   methods: {
    getData(){
       this.$apollo.query({
            query: require("~/gql/queries/student").students
        }).then(rs => {
          this.students=rs.data.students
            console.log(rs);
        }).catch(error => {
            console.log(error);
        });
    },
    saveAction(){
      this.$apollo.mutate({
        mutation:mutationStudent.insert_students,
        variables:{
          firstname:this.frm.firstname,
          lastname:this.frm.lastname,
          gender:this.frm.gender
        }
      }).then(rs=>{
        this.showAdd=false
        this.students.push(rs.data.insert_students.returning[0])
        console.log(rs)
      }).catch(error=>{
        console.log(error)
      })
    }
   },
}
</script>

<style scoped>

</style> -->


<template>
  <div>
    <div>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-btn
            @click="showAdd = !showAdd"
            color="success"
            absolute
            icon
            top
            right
            ><v-icon>mdi-plus</v-icon></v-btn
          >
          <v-flex v-show="showAdd">
            <v-radio-group v-model="frm.gender">
              <v-radio label="Female" value="F"></v-radio>
              <v-radio label="Male" value="M"></v-radio>
            </v-radio-group>
            <v-text-field
              v-model="frm.firstname"
              name="name"
              label="Firstname"
            ></v-text-field>
            <v-text-field
              v-model="frm.lastname"
              name="name"
              label="Lastname"
            ></v-text-field>
            <v-btn @click="saveAction" color="success">Save</v-btn>
            <v-btn @click="showAdd = !showAdd" color="error">Cancel</v-btn>
          </v-flex>
        </v-layout>
        <table>
          <thead>
            <tr>
              <th>Gender</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in students" :key="index">
              <td>{{ item.gender }}</td>
              <td>{{ item.firstname }}</td>
              <td>{{ item.lastname }}</td>
              <td>
                <v-btn @click="getEdit(item)" color="success" icon
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
                <v-btn @click="openConfirmDelete(item, index)" color="error" icon
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </table>
      </v-container>
    </div>

    <!-- form Edit -->
    <v-dialog
      v-model="showEdit"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          <h2>Edit data student</h2>
        </v-card-title>
        <v-card-text>
          <v-radio-group v-model="edit.gender">
            <v-radio label="Female" value="F"></v-radio>
            <v-radio label="Male" value="M"></v-radio>
          </v-radio-group>
          <v-text-field
            v-model="edit.firstname"
            name="name"
            label="Firstname"
          ></v-text-field>
          <v-text-field
            v-model="edit.lastname"
            name="name"
            label="Lastname"
          ></v-text-field>
          <v-btn @click="updateAction" color="success">Save</v-btn>
          <v-btn @click="showEdit = !showEdit" color="error">Cancel</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- dialog delete confirm -->
    <v-dialog
      v-model="deleteForm"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card-title primary-title>
        Delete Student
      </v-card-title>
      <v-card-text>
        <h4>{{edit.firstname+ ' '+ edit.lastname}}</h4>
      </v-card-text>
      <v-card-text>
        <v-btn @click="deleteForm = !deleteForm" text color="primary">Cancel</v-btn>
        <v-btn @click="deleteAction" color="error">Delete</v-btn>
      </v-card-text>
    </v-dialog>
  </div>
</template>

<script>
import mutationStudent from "~/gql/mutations/students";
export default {
  layout: "blank",
  data() {
    return {
      students: [],
      frm: {
        firstname: "",
        lastname: "",
        gender: "M"
      },
      edit: {
        firstname: "",
        lastname: "",
        gender: "M"
      },
      showAdd: false,
      showEdit: false,
      deleteForm: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$apollo
        .query({
          query: require("~/gql/queries/student").students
        })
        .then(rs => {
          this.students = rs.data.students;
          console.log(rs);
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveAction() {
      this.$apollo
        .mutate({
          mutation: mutationStudent.insert_students,
          variables: {
            firstname: this.frm.firstname,
            gender: this.frm.gender,
            lastname: this.frm.lastname
          }
        })
        .then(rs => {
          this.showAdd = false;
          this.students.push(rs.data.insert_students.returning[0]);
          // this.students.push(rs.data.insert_students[0])
        })
        .catch(er => {
          console.log(er);
        });
    },
    getEdit(item) {
      this.showEdit = true;
      this.edit = item;
    },
    updateAction() {
      this.$apollo
        .mutate({
          mutation: mutationStudent.update_students,
          variables: {
            firstname: this.edit.firstname,
            gender: this.edit.gender,
            lastname: this.edit.lastname,
            id: this.edit.id
          }
        })
        .then(rs => {
          this.showEdit = false;
        })
        .catch(er => {
          console.log(er);
        });
    },
    openConfirmDelete(item, index) {
      this.index = index
      this.edit = item
      this.deleteForm = true
    },
    deleteAction() {
      this.$apollo
        .mutate({
          mutation: mutationStudent.delete_students,
          variables: {
            id: this.edit.id
          }
          
        })
        .then(rs => {
          this.deleteForm = false;
          this.students.splice(this.index, 1)
        })
        .catch(er => {
          console.log(er);
        });
    }
  }
};
</script>

<style></style>
