package com.example.lemonade

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.lemonade.ui.theme.LemonadeTheme
import kotlin.math.round
import kotlin.random.Random


class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            LemonadeTheme {
                LemonApp()

            }
        }
    }
}

@Composable
fun LemonApp() {
    var firstLaunch by remember { mutableStateOf(true) }
    var currVal by remember { mutableIntStateOf(1) }
    var clickCount by remember { mutableStateOf(0) }
    var randomClicks by remember { mutableIntStateOf(Random.nextInt(2,10)) }

    if (firstLaunch) {
        WelcomeScreen(name = "User") {
            firstLaunch = false
        }
    } else {

        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.background
        ) {
            Column {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color.Yellow)
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.Center
                ) {
                    Text(
                        text = "Lemonade",
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Bold
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))


                when (currVal) {
                    1 -> {
                        Column (
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center,
                            modifier = Modifier.fillMaxSize()
                        ) {
                            Text(text = stringResource(R.string.egg_carton))
                            Spacer(modifier = Modifier.height(32.dp))
                            Box(
                                modifier = Modifier
                                    .background(Color(0xFFADD8E6), RoundedCornerShape(16.dp))
                                    .padding(16.dp)
                            ) {
                                Image(
                                    painter = painterResource(R.drawable.egg_carton),
                                    contentDescription = stringResource(R.string.egg_carton),
                                    modifier = Modifier
                                        .wrapContentSize()
                                        .clickable {
                                            currVal = 2
                                        }
                                )
                            }
                        }
                    }
                    2 -> {
                        Column (
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center,
                            modifier = Modifier.fillMaxSize()
                        ) {
                            Text(text = stringResource(R.string.egg))
                            Spacer(modifier = Modifier.height(32.dp))
                            Box(
                                modifier = Modifier
                                    .background(Color(0xFFADD8E6), RoundedCornerShape(16.dp))
                                    .padding(16.dp)
                            ) {
                                Image(
                                    painter = painterResource(R.drawable.egg),
                                    contentDescription = stringResource(R.string.egg),
                                    modifier = Modifier
                                        .wrapContentSize()
                                        .clickable {
                                            clickCount++
                                            if (clickCount >= randomClicks){
                                                currVal = 3
                                                clickCount = 0
                                                randomClicks = Random.nextInt(2, 10)
                                            }
                                        }
                                )
                            }

                        }
                    }
                    3 -> {
                        Column (
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center,
                            modifier = Modifier.fillMaxSize()
                        ) {
                            Text(text = stringResource(R.string.fried_egg))
                            Spacer(modifier = Modifier.height(32.dp))
                            Box(
                                modifier = Modifier
                                    .background(Color(0xFFADD8E6), RoundedCornerShape(16.dp))
                                    .padding(16.dp)
                            ) {
                                Image(
                                    painter = painterResource(R.drawable.fried),
                                    contentDescription = stringResource(R.string.fried_egg),
                                    modifier = Modifier
                                        .wrapContentSize()
                                        .clickable {
                                            currVal = 4
                                        }
                                )
                            }

                        }
                    }
                    else -> {
                        Column (
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center,
                            modifier = Modifier.fillMaxSize()
                        ) {
                            Text(text = stringResource(R.string.empty_plate))
                            Spacer(modifier = Modifier.height(32.dp))
                            Box(
                                modifier = Modifier
                                    .background(Color(0xFFADD8E6), RoundedCornerShape(16.dp))
                                    .padding(16.dp)
                            ) {
                                Image(
                                    painter = painterResource(R.drawable.emptyplate),
                                    contentDescription = stringResource(R.string.empty_plate),
                                    modifier = Modifier
                                        .wrapContentSize()
                                        .clickable {
                                            currVal = 1
                                        }
                                )
                            }

                        }
                    }
                }
            }



        }
    }

}

@Composable
fun WelcomeScreen(name: String, onStartClicked: () -> Unit) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
        modifier = Modifier.fillMaxSize()
    ) {
        Text(text = "Welcome $name!")
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            onClick = onStartClicked
        ) {
            Text("Start")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    LemonadeTheme {
        LemonApp()
    }
}