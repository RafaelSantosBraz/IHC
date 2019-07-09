package com.u.faltmetrogps;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.AndroidViewModel;

import android.content.Intent;
import android.os.Bundle;
import android.widget.EditText;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void abrirMenuLateral(android.view.View view){
         EditText email = findViewById(R.id.editEmail);
        if (email.getText().toString().equals("aluno@uenp.edu.br")){
            startActivity(new Intent(getApplicationContext(), DisciplinasAluno.class));
        } else if (email.getText().toString().equals("professor@uenp.edu.br")){
            startActivity(new Intent(getApplicationContext(), DisciplinasProfessor.class));
        }
    }
}
