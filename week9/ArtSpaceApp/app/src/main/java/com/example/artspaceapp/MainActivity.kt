package com.example.artspaceapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.artspaceapp.ui.theme.ArtSpaceAppTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ArtSpaceAppTheme {
                ArtSpaceApp()
            }
        }
    }
}

@Composable
fun ArtSpaceApp() {
    var currentIndex by remember { mutableIntStateOf(0) }
    var searchQuery by remember { mutableStateOf("") }
    val artworks = listOf(
        ArtWork(R.drawable.art1, "Great Cookie Monster Wave", "Unknown", "2021"),
        ArtWork(R.drawable.art2, "Droopy Clocks", "Dali", "2020"),
        ArtWork(R.drawable.art3, "Colors", "Unkown", "2019")
    )

    Surface(modifier = Modifier.fillMaxSize()) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.Center
        ) {
            ArtWorkDisplay(
                artwork = artworks[currentIndex],
                onNext = { currentIndex = (currentIndex + 1) % artworks.size },
                onPrevious = { currentIndex = (currentIndex - 1 + artworks.size) % artworks.size }
            )
            Spacer(modifier = Modifier.height(16.dp))
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                TextField(
                    value = searchQuery,
                    onValueChange = { searchQuery = it },
                    label = { Text("Search by Title") }
                )
                Spacer(modifier = Modifier.height(8.dp))
                Button(onClick = {
                    val index = artworks.indexOfFirst { it.title.equals(searchQuery, ignoreCase = true) }
                    if (index != -1) {
                        currentIndex = index
                    }
                }) {
                    Text("Search")
                }
            }

        }
    }
}

@Composable
fun ArtWorkDisplay(artwork: ArtWork, onNext: () -> Unit, onPrevious: () -> Unit) {
    Column(horizontalAlignment = androidx.compose.ui.Alignment.CenterHorizontally) {
        Image(
            painter = painterResource(id = artwork.imageRes),
            contentDescription = null,
            modifier = Modifier
                .fillMaxWidth()
                .height(300.dp)
                .padding(4.dp)
                .border(BorderStroke(4.dp, Color.White), shape = RoundedCornerShape(8.dp))
        )
        Spacer(modifier = Modifier.height(16.dp))
        Column(
            modifier = Modifier
                .padding(16.dp)
                .border(BorderStroke(2.dp, Color.LightGray), shape = RoundedCornerShape(8.dp))
                .padding(8.dp)
        ) {
            Text(text = artwork.title, fontSize = 24.sp)
            Text(text = artwork.artist, fontSize = 20.sp)
            Text(text = artwork.year, fontSize = 16.sp)
        }
        Spacer(modifier = Modifier.height(16.dp))
        Row(
            horizontalArrangement = Arrangement.SpaceEvenly,
            modifier = Modifier.fillMaxWidth()
        ) {
            Button(
                onClick = onPrevious,
                modifier = Modifier.weight(1f)
            ) {
                Text("Previous")
            }
            Button(
                onClick = onNext,
                modifier = Modifier.weight(1f)
            ) {
                Text("Next")
            }
        }
    }
}

data class ArtWork(val imageRes: Int, val title: String, val artist: String, val year: String)

@Preview(showBackground = true)
@Composable
fun ArtSpacePreview() {
    ArtSpaceAppTheme {
        ArtSpaceApp()
    }
}