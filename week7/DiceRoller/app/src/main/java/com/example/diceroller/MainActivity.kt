package com.example.diceroller


import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.Spacer
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import com.example.diceroller.ui.theme.DiceRollerTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            DiceRollerTheme {
                DiceRollerApp()

                }
            }
        }
}

@SuppressLint("MutableCollectionMutableState")
@Composable
fun DiceWithButtonAndImage(modifier: Modifier = Modifier) {
var rollCount by remember { mutableStateOf(1) }
var result1 by remember { mutableStateOf(1) }
var result2 by remember { mutableStateOf(1) }
val rollHistory = remember { mutableStateListOf<Triple<Int, Int, Int>>() }
val imageResource1 = when (result1) {
    1 -> R.drawable.dice_1
    2 -> R.drawable.dice_2
    3 -> R.drawable.dice_3
    4 -> R.drawable.dice_4
    5 -> R.drawable.dice_5
    else -> R.drawable.dice_6
}
val imageResource2 = when (result2) {
    1 -> R.drawable.dice_1
    2 -> R.drawable.dice_2
    3 -> R.drawable.dice_3
    4 -> R.drawable.dice_4
    5 -> R.drawable.dice_5
    else -> R.drawable.dice_6
}

    Column(
        modifier = modifier
            .background(Color.DarkGray)
            .fillMaxSize()
            .wrapContentSize(Alignment.Center),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Row(
            modifier = Modifier.wrapContentSize(Alignment.Center),
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Image(
                painter = painterResource(imageResource1),
                contentDescription = result1.toString()
            )
            Image(
                painter = painterResource(imageResource2),
                contentDescription = result2.toString()
            )
        }
        Spacer(modifier = Modifier.height(16.dp))
        Row() {
            Button(onClick = {
                result1 = (1..6).random()
                result2 = (1..6).random()
                rollHistory.add(Triple(rollCount, result1, result2))
                rollCount ++
            }) {
                Text(stringResource(R.string.roll))
            }
            Spacer(modifier = Modifier.width(16.dp))
            Button(onClick = {
                rollHistory.clear()
                rollCount = 1
            }) {
                Text(stringResource(R.string.clear))
            }
        }
        Spacer(modifier = Modifier.height(16.dp))
        LazyColumn(modifier = Modifier.height(300.dp)) {
            items(rollHistory) {roll ->
                Text(text = "Roll: ${roll.first} Dice 1: ${roll.second}, Dice 2: ${roll.third}",
                    color = Color.White)
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DiceRollerApp() {
    DiceWithButtonAndImage(modifier = Modifier
        .fillMaxSize()
        .wrapContentSize(Alignment.Center)
    )
}